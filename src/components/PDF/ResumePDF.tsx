import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';
import type { ResumeData } from '../../types/resume';

// Register a standard font
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' }, // Regular
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 'bold' }, // Fallback for now
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
        color: '#333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderBottomStyle: 'solid',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        fontSize: 10,
        color: '#666',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        borderBottomStyle: 'solid',
        marginBottom: 8,
        paddingBottom: 2,
        marginTop: 5,
        textTransform: 'uppercase',
    },
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    itemSubtitle: {
        fontStyle: 'italic',
        fontSize: 10,
    },
    itemDate: {
        fontSize: 10,
        color: '#666',
    },
    richText: {
        marginTop: 2,
        fontSize: 10,
        textAlign: 'justify',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
});

// Better approach for HTML: specialized parser
const renderHtml = (html: string) => {
    // Regex to find tokens
    const tokens = html.split(/(<\/?(?:b|strong|i|em|a|p|ul|li|br)[^>]*>)/g);

    const elements: React.ReactNode[] = [];
    let currentStyle: any = {};
    let currentLink: string | null = null;

    tokens.forEach((token, i) => {
        if (token.startsWith('<')) {
            // Tag
            if (token === '<b>' || token === '<strong>') {
                currentStyle = { ...currentStyle, fontWeight: 'bold' };
            } else if (token === '</b>' || token === '</strong>') {
                const { fontWeight, ...rest } = currentStyle;
                currentStyle = rest;
            } else if (token === '<i>' || token === '<em>') {
                currentStyle = { ...currentStyle, fontStyle: 'italic' };
            } else if (token === '</i>' || token === '</em>') {
                const { fontStyle, ...rest } = currentStyle;
                currentStyle = rest;
            } else if (token.startsWith('<a ')) {
                const match = token.match(/href="([^"]*)"/);
                if (match) currentLink = match[1];
            } else if (token === '</a>') {
                currentLink = null;
            } else if (token === '<br>' || token === '<br/>') {
                elements.push(<Text key={i}>{'\n'}</Text>);
            } else if (token === '<li>') {
                elements.push(<Text key={i}>{'\n• '}</Text>);
            } else if (token === '</p>') {
                elements.push(<Text key={i}>{'\n\n'}</Text>);
            }
        } else {
            // Text Content
            // Decode HTML entities if needed (basic ones)
            const text = token
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');

            if (text) {
                if (currentLink) {
                    elements.push(
                        <Link key={i} src={currentLink} style={{ ...currentStyle, ...styles.link }}>
                            {text}
                        </Link>
                    );
                } else {
                    elements.push(
                        <Text key={i} style={currentStyle}>
                            {text}
                        </Text>
                    );
                }
            }
        }
    });

    return <Text style={styles.richText}>{elements}</Text>;
};


const ResumePDF: React.FC<{ data: ResumeData }> = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{data.details.name}</Text>
                    <View style={styles.contactRow}>
                        <Text>{data.details.email}</Text>
                        <Text>{data.details.phone}</Text>
                        {data.details.links.map((link) => (
                            <Link key={link.id} src={link.url} style={styles.link}>{link.label}</Link>
                        ))}
                    </View>
                </View>

                {data.sections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        {section.items.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemDate}>{item.date}</Text>
                                </View>
                                {item.subtitle && (
                                    <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
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
