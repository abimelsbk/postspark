import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { textStyles } from '../../utils/textStyles';

const samplePosts = [
  {
    title: "Leadership Insight",
    before: "Just had an amazing team meeting today. We discussed our Q4 goals and everyone was so engaged. Leadership is about bringing out the best in people.",
    after: "𝒥𝓊𝓈𝓉 𝒽𝒶𝒹 𝒶𝓃 𝒶𝓂𝒶𝓏𝒾𝓃𝑔 𝓉𝑒𝒶𝓂 𝓂𝑒𝑒𝓉𝒾𝓃𝑔 𝓉𝑜𝒹𝒶𝓎. 𝒲𝑒 𝒹𝒾𝓈𝒸𝓊𝓈𝓈𝑒𝒹 𝑜𝓊𝓇 𝒬𝟦 𝑔𝑜𝒶𝓁𝓈 𝒶𝓃𝒹 𝑒𝓋𝑒𝓇𝓎𝑜𝓃𝑒 𝓌𝒶𝓈 𝓈𝑜 𝑒𝓃𝑔𝒶𝑔𝑒𝒹. 🚀 𝐋𝐞𝐚𝐝𝐞𝐫𝐬𝐡𝐢𝐩 𝐢𝐬 𝐚𝐛𝐨𝐮𝐭 𝐛𝐫𝐢𝐧𝐠𝐢𝐧𝐠 𝐨𝐮𝐭 𝐭𝐡𝐞 𝐛𝐞𝐬𝐭 𝐢𝐧 𝐩𝐞𝐨𝐩𝐥𝐞. ⭐",
    style: "Fancy Script + Bold"
  },
  {
    title: "Tech Innovation",
    before: "Excited to share our new AI feature launch! This will revolutionize how teams collaborate.",
    after: "🔥 𝔼𝕩𝕔𝕚𝕥𝕖𝕕 𝕥𝕠 𝕤𝕙𝕒𝕣𝕖 𝕠𝕦𝕣 𝕟𝕖𝕨 𝔸𝕀 𝕗𝖊𝖆𝖙𝖚𝖗𝖊 𝖑𝖆𝖚𝖓𝖈𝖍! 🔥\n\n💎 𝕿𝖍𝖎𝖘 𝖜𝖎𝖑𝖑 𝖗𝖊𝖛𝖔𝖑𝖚𝖙𝖎𝖔𝖓𝖎𝖟𝖊 𝖍𝖔𝖜 𝖙𝖊𝖆𝖒𝖘 𝖈𝖔𝖑𝖑𝖆𝖇𝖔𝖗𝖆𝖙𝖊 💎",
    style: "Double Struck + Frames"
  },
  {
    title: "Success Story",
    before: "Proud to announce we hit 1M users! Thank you to our amazing community.",
    after: "⚡ ℙ𝕣𝕠𝕦𝕕 𝕥𝕠 𝕒𝕟𝕟𝕠𝕦𝕟𝕔𝕖 𝕨𝕖 𝕙𝕚𝕥 𝟙𝕄 𝕦𝕤𝕖𝕣𝕤! ⚡\n\n🌈 𝚃𝚑𝚊𝚗𝚔 𝚢𝚘𝚞 𝚝𝚘 𝚘𝚞𝚛 𝚊𝚖𝚊𝚣𝚒𝚗𝚐 𝚌𝚘𝚖𝚖𝚞𝚗𝚒𝚝𝚢 🌈",
    style: "Blackboard Bold + Lightning"
  }
];

export const PostFormatterHighlights: React.FC = () => {
  const [showAfter, setShowAfter] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Unicode Magic
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Transform ordinary text into
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              eye-catching content
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Stand out in the LinkedIn feed with our powerful Unicode formatter. 25+ unique styles that work everywhere.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`font-medium transition-colors ${!showAfter ? 'text-gray-900' : 'text-gray-500'}`}>
              Before
            </span>
            <button
              onClick={() => setShowAfter(!showAfter)}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                  showAfter ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium transition-colors ${showAfter ? 'text-gray-900' : 'text-gray-500'}`}>
              After
            </span>
          </div>
        </div>

        {/* Post Previews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {samplePosts.map((post, index) => (
            <div key={index} className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-white/20 relative overflow-hidden animate-glow">
                {/* Neon Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full">
                      {post.style}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 mb-4 min-h-[120px] flex items-center border border-gray-200">
                    <p className="text-sm leading-relaxed text-gray-800 font-medium">
                      {showAfter ? post.after : post.before}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(showAfter ? post.after : post.before, index)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Style Showcase */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            25+ Unique Styles Available
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {textStyles.slice(0, 10).map((style, index) => (
              <div key={index} className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-lg mb-2 font-medium">
                  {style.transform("Aa")}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {style.name}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
              <span>View all 25+ styles</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
