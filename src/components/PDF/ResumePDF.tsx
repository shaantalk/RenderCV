import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import type { ResumeData } from '../../types/resume';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Roboto',
        fontSize: 10,
        lineHeight: 1.4,
        color: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 15,
    },
    headerLeft: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    contactItem: {
        fontSize: 10,
        marginBottom: 2,
        flexDirection: 'row',
    },
    contactLabel: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    link: {
        color: '#0056b3',
        textDecoration: 'none',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#000',
        marginBottom: 8,
        paddingBottom: 2,
    },
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0056b3', // Optional: mimic the blue title from image? User image had blue title
    },
    itemRole: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    itemDate: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    richText: {
        fontSize: 10,
        textAlign: 'justify',
    },
    bulletPoint: {
        width: 10,
        fontSize: 10,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 2,
    }
});

// Robust HTML Renderer for PDF
const renderHtml = (html: string) => {
    // We need to handle <ul><li>...</li></ul> significantly better.
    // Strategy: Split by top-level blocks.

    // 1. Clean up HTML
    const cleanHtml = html.replace(/\n/g, '').replace(/\r/g, '');

    // 2. Extract list items if present, otherwise treat as paragraph
    if (cleanHtml.includes('<li>')) {
        // Regex to extract li contents
        const liRegex = /<li>(.*?)<\/li>/g;
        const items = [];
        let match;
        while ((match = liRegex.exec(cleanHtml)) !== null) {
            items.push(match[1]);
        }

        return (
            <View>
                {items.map((itemHtml, i) => (
                    <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <View style={{ flex: 1 }}>
                            {parseInlineHtml(itemHtml)}
                        </View>
                    </View>
                ))}
            </View>
        );
    } else {
        // Just a paragraph
        return <Text style={styles.richText}>{parseInlineHtml(cleanHtml)}</Text>;
    }
};

const parseInlineHtml = (html: string) => {
    // Handles <b>, <i>, <a>, <br> inline
    const tokens = html.split(/(<\/?(?:b|strong|i|em|a|br)[^>]*>)/g);
    const elements: React.ReactNode[] = [];

    let currentStyle: any = {};
    let currentLink: string | null = null;

    tokens.forEach((token, i) => {
        if (token.startsWith('<')) {
            if (token === '<b>' || token === '<strong>') currentStyle = { ...currentStyle, fontWeight: 'bold' };
            else if (token === '</b>' || token === '</strong>') {
                const { fontWeight, ...rest } = currentStyle;
                currentStyle = rest;
            }
            else if (token === '<i>' || token === '<em>') currentStyle = { ...currentStyle, fontStyle: 'italic' };
            else if (token === '</i>' || token === '</em>') {
                const { fontStyle, ...rest } = currentStyle;
                currentStyle = rest;
            }
            else if (token.startsWith('<a ')) {
                const match = token.match(/href="([^"]*)"/);
                if (match) currentLink = match[1];
            }
            else if (token === '</a>') currentLink = null;
            else if (token === '<br>' || token === '<br/>') elements.push(<Text key={i}>{'\n'}</Text>);
        } else {
            const text = token
                .replace(/<[^>]+>/g, '') // remove any stray tags
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');

            if (text) {
                if (currentLink) {
                    elements.push(<Link key={i} src={currentLink} style={{ ...currentStyle, ...styles.link }}>{text}</Link>);
                } else {
                    elements.push(<Text key={i} style={currentStyle}>{text}</Text>);
                }
            }
        }
    });

    return <Text>{elements}</Text>;
}


const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{data.details.name}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.contactItem}><Text style={styles.contactLabel}>Phone: </Text>{data.details.phone}</Text>
                        <Text style={styles.contactItem}><Text style={styles.contactLabel}>Email: </Text>{data.details.email}</Text>
                        {data.details.links.map(link => (
                            <Text key={link.id} style={styles.contactItem}>
                                <Text style={styles.contactLabel}>{link.label}: </Text>
                                <Link src={link.url} style={styles.link}>{link.url.replace(/^https?:\/\//, '')}</Link>
                            </Text>
                        ))}
                    </View>
                </View>

                {data.sections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.items.map((item) => (
                            <View key={item.id} style={styles.item}>
                                {/* Specific Layout for Jobs: Company Left, Date Right. Role below company. */}
                                {(section.type === 'experience' || section.type === 'education') ? (
                                    <>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{item.title}</Text>
                                            <Text style={styles.itemRole}>{item.subtitle}</Text>
                                            <Text style={styles.itemDate}>{item.date}</Text>
                                        </View>
                                        {/* If it's a multi-line role/school description, it goes here */}
                                        {renderHtml(item.description)}
                                    </>
                                ) : (
                                    /* Default layout for other sections */
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                        <Text style={styles.itemRole}>{item.subtitle}</Text>
                                        <Text style={styles.itemDate}>{item.date}</Text>
                                    </View>
                                )}

                                {renderHtml(item.description)}
                            </View>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default ResumePDF;
