import React from 'react'
import { Mail, Phone, Instagram } from 'lucide-react'

const Contact = () => {
  return (
    <div id="contact" className="w-full py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/50 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 mb-12">Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menyapa!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Mail size={32} />, title: "Email", text: "hello@mofu.com" },
              { icon: <Phone size={32} />, title: "WhatsApp", text: "+62 812 3456 7890" },
              { icon: <Instagram size={32} />, title: "Instagram", text: "@mofu_photobox" }
            ].map((item, idx) => (
              <a key={idx} href="#" className="flex flex-col items-center group p-4 rounded-xl hover:bg-white hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
