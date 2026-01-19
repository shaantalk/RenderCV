import { isBengaliLanguage } from '@/locales/i18n'
import type { ILinkData, IWidgetNode, WidgetType } from '#widgets/types'

export function generateWidgetId(): string {
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

export function createDefaultWidgets(): IWidgetNode[] {
  const isBengali = isBengaliLanguage()
  return [
    {
      type: 'BasicInfo',
      id: generateWidgetId(),
      data: {
        propsData: {
          avatarUrl: `${import.meta.env.BASE_URL}avatar.jpg`,
          avatarSize: 86,
          avatarRound: true,
          name: isBengali ? 'সান্তনু পান্ডা' : 'Santanu Panda',
          jobTitle: isBengali ? 'সফটওয়্যার ইঞ্জিনিয়ার' : 'Software Engineer',
          linksGroup: [
            [
              { href: '', content: '1995/01', icon: 'cake' },
              { href: '', content: '+1 234 567 890', icon: 'phone' },
            ],
            [
              { href: 'https://github.com/shaantalk', content: 'github.com/shaantalk', icon: 'github' },
              {
                href: 'mailto:shaantalk@gmail.com',
                content: 'shaantalk@gmail.com',
                icon: 'gmail',
              },
            ],
            [],
          ],
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isBengali ? 'পেশাগত দক্ষতা' : 'Professional Skills' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'TextContent',
      id: generateWidgetId(),
      data: {
        propsData: {
          content: isBengali
            ? '<ul><li><p><code>JavaScript</code>, <code>TypeScript</code> ভাষায় দক্ষ;</p></li><li><p><code>Vue</code>, <code>React</code> ব্যবহার করে ফ্রন্টএন্ড অ্যাপ্লিকেশনে অভিজ্ঞ এবং মূল নীতিগুলি বোঝেন;</p></li><li><p><code>Vite</code>, <code>Webpack</code> এবং অন্যান্য বিল্ড টুল ব্যবহারে দক্ষ;</p></li><li><p><code>NodeJS</code>, <code>MySQL</code>, <code>Redis</code> সহ ব্যাকএন্ড ডেভেলপমেন্টে দক্ষ;</p></li></ul>'
            : '<ul><li><p>Proficient in <code>JavaScript</code>, <code>TypeScript</code>;</p></li><li><p>Experienced with <code>Vue</code>, <code>React</code> frontend development and understanding of core principles;</p></li><li><p>Skilled in using <code>Vite</code>, <code>Webpack</code> and other build tools;</p></li><li><p>Proficient in backend development with <code>NodeJS</code>, <code>MySQL</code>, <code>Redis</code>;</p></li></ul>',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isBengali ? 'কাজের অভিজ্ঞতা' : 'Work Experience' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'ExperienceTime',
      id: generateWidgetId(),
      data: {
        propsData: {
          title: isBengali ? 'এক্সএক্স কোম্পানি' : 'XX Company',
          dateRange: '2077/07 - 2080/07',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TextContent',
      id: generateWidgetId(),
      data: {
        propsData: {
          content: isBengali
            ? '<h3>এক্সএক্স প্রজেক্ট - ওয়েব ফ্রন্টএন্ড ডেভেলপমেন্ট</h3><ul><li><p>প্রয়োজনীয়তা বিশ্লেষণ থেকে ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন, ফিচার ডেভেলপমেন্ট এবং পারফরম্যান্স অপ্টিমাইজেশনের সম্পূর্ণ উন্নয়ন প্রক্রিয়ার জন্য দায়ী।</p></li><li><p>পণ্যের গুণমান নিশ্চিত করতে পণ্য, ডিজাইন এবং ব্যাকএন্ড টিমের সাথে ঘনিষ্ঠভাবে সহযোগিতা করা।</p></li><li><p>ব্যবহারকারীর অভিজ্ঞতা এবং ফ্রন্টএন্ড পারফরম্যান্সের গভীর গবেষণার মাধ্যমে পেমেন্ট প্রসেস পেজ সফলভাবে অপ্টিমাইজ করা, যা ব্যবহারকারীর রূপান্তর এবং পেমেন্ট সাফল্যের হার বাড়িয়েছে।</p></li></ul>'
            : '<h3>XX Project - Web Frontend Development</h3><ul><li><p>Responsible for the full development process from requirement analysis to frontend architecture design, feature development, and performance optimization.</p></li><li><p>Consistently collaborated with product, design, and backend teams to promote agile development processes and implement CI/CD toolchains, ensuring high-quality delivery.</p></li><li><p>Successfully optimized the payment process page through in-depth research on user experience and frontend performance, improving user conversion and payment success rates.</p></li></ul>',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
    {
      type: 'TitleSection',
      id: generateWidgetId(),
      data: {
        propsData: { title: isBengali ? 'শিক্ষাগত যোগ্যতা' : 'Education' },
        styleData: { marginTop: 20, marginBottom: 12 },
      },
    },
    {
      type: 'ExperienceTime',
      id: generateWidgetId(),
      data: {
        propsData: {
          title: isBengali ? 'এক্সএক্স বিশ্ববিদ্যালয় - সফটওয়্যার ইঞ্জিনিয়ারিং' : 'XX University - Software Engineering',
          dateRange: '2073/07 - 2077/07',
        },
        styleData: { marginTop: 0, marginBottom: 0 },
      },
    },
  ]
}

export function createWidgetNode(type: WidgetType): IWidgetNode {
  const isBengali = isBengaliLanguage()
  const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
  switch (type) {
    case 'BasicInfo':
      return {
        type: 'BasicInfo',
        id,
        data: {
          propsData: {
            avatarUrl: `${import.meta.env.BASE_URL}avatar.jpg`,
            avatarSize: 86,
            avatarRound: true,
            name: isBengali ? 'সান্তনু পান্ডা' : 'Santanu Panda',
            jobTitle: isBengali ? 'সফটওয়্যার ইঞ্জিনিয়ার' : 'Software Engineer',
            linksGroup: [
              [
                {
                  href: '',
                  content: '1995/01',
                  icon: 'cake',
                },
                {
                  href: '',
                  content: '+1 234 567 890',
                  icon: 'phone',
                },
              ],
              [
                {
                  href: 'https://github.com/shaantalk',
                  content: 'github.com/shaantalk',
                  icon: 'github',
                },
                {
                  href: 'mailto:shaantalk@gmail.com',
                  content: 'shaantalk@gmail.com',
                  icon: 'gmail',
                },
              ],
              [],
            ],
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'TitleSection':
      return {
        type: 'TitleSection',
        id,
        data: {
          propsData: {
            title: isBengali ? 'কাজের অভিজ্ঞতা' : 'Work Experience',
          },
          styleData: {
            marginTop: 20,
            marginBottom: 12,
          },
        },
      }
    case 'ExperienceTime':
      return {
        type: 'ExperienceTime',
        id,
        data: {
          propsData: {
            title: isBengali ? 'এক্সএক্স কোম্পানি' : 'XX Company',
            dateRange: '2077/07 - 2080/07',
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'TextContent':
      return {
        type: 'TextContent',
        id,
        data: {
          propsData: {
            content: isBengali
              ? '<h3>এক্সএক্স প্রজেক্ট - ওয়েব ফ্রন্টএন্ড ডেভেলপমেন্ট</h3><ul><li><p>প্রয়োজনীয়তা বিশ্লেষণ থেকে ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন, ফিচার ডেভেলপমেন্ট এবং পারফরম্যান্স অপ্টিমাইজেশনের সম্পূর্ণ উন্নয়ন প্রক্রিয়ার জন্য দায়ী।</p></li><li><p>পণ্যের গুণমান নিশ্চিত করতে পণ্য, ডিজাইন এবং ব্যাকএন্ড টিমের সাথে ঘনিষ্ঠভাবে সহযোগিতা করা।</p></li><li><p>ব্যবহারকারীর অভিজ্ঞতা এবং ফ্রন্টএন্ড পারফরম্যান্সের গভীর গবেষণার মাধ্যমে পেমেন্ট প্রসেস পেজ সফলভাবে অপ্টিমাইজ করা, যা ব্যবহারকারীর রূপান্তর এবং পেমেন্ট সাফল্যের হার বাড়িয়েছে।</p></li></ul>'
              : '<h3>XX Project - Web Frontend Development</h3><ul><li><p>Responsible for the full development process from requirement analysis to frontend architecture design, feature development, and performance optimization.</p></li><li><p>Consistently collaborated with product, design, and backend teams to promote agile development processes and implement CI/CD toolchains, ensuring high-quality delivery.</p></li><li><p>Successfully optimized the payment process page through in-depth research on user experience and frontend performance, improving user conversion and payment success rates.</p></li></ul>',
          },
          styleData: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }
    case 'ImageSection':
      return {
        type: 'ImageSection',
        id,
        data: {
          propsData: {
            url: `${import.meta.env.BASE_URL}image.png`,
            imageSize: 100,
            borderRadius: 0,
          },
          styleData: {
            marginTop: 10,
            marginBottom: 10,
          },
        },
      }
    default: {
      const exhaustiveCheck: never = type
      return exhaustiveCheck
    }
  }
}

export function createLinkData(): ILinkData {
  return {
    href: 'https://github.com/',
    content: 'github.com',
    icon: 'link',
  }
}
