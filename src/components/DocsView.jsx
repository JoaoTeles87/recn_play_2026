import React, { useState } from 'react';
import { RAW_DOCUMENTS } from '../data/mockData';
import { FileText, Copy, Check, Search, Download, BookOpen, Layers, Terminal } from 'lucide-react';

export function DocsView() {
  const [activeDocId, setActiveDocId] = useState(RAW_DOCUMENTS[0].id);
  const [copied, setCopied] = useState(false);
  const [docSearch, setDocSearch] = useState('');
  const [viewMode, setViewMode] = useState('formatted'); // 'formatted' | 'raw'

  const currentDoc = RAW_DOCUMENTS.find(d => d.id === activeDocId) || RAW_DOCUMENTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 pb-28 animate-in fade-in duration-200">
      {/* Topo do Visualizador de Documentação */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 text-white shadow-md mb-4 border border-emerald-700/50">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5 text-orange-400" />
          <span>Base de Conhecimento em Saúde • Apenas Dia 11/11</span>
        </div>
        <h2 className="text-base font-extrabold leading-tight">
          Documentos e Referências de Saúde .md
        </h2>
        <p className="text-xs text-emerald-100 mt-1">
          Consulta aberta aos arquivos de programação, mapa oficial e mapeamento de startups de saúde para o dia 11 de Novembro.
        </p>
      </div>

      {/* Seleção de Documentos (Carrossel Horizontal com Abas) */}
      <div className="flex space-x-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
        {RAW_DOCUMENTS.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              setActiveDocId(doc.id);
              setDocSearch('');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 flex items-center space-x-1.5 ${
              activeDocId === doc.id
                ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{doc.badge}</span>
          </button>
        ))}
      </div>

      {/* Barra de Ações do Documento Selecionado */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm mb-3">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-black text-slate-900 leading-tight">
              {currentDoc.title}
            </h3>
            <p className="text-[10px] text-slate-500">{currentDoc.subtitle}</p>
          </div>
          <div className="flex items-center space-x-1.5">
            {/* Toggle de Modo Formatado / Raw */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex text-[10px] font-bold">
              <button
                onClick={() => setViewMode('formatted')}
                className={`px-2 py-1 rounded-md transition-all ${
                  viewMode === 'formatted' ? 'bg-white shadow text-purple-700' : 'text-slate-500'
                }`}
              >
                Formatado
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-2 py-1 rounded-md transition-all ${
                  viewMode === 'raw' ? 'bg-white shadow text-purple-700' : 'text-slate-500'
                }`}
              >
                Raw .md
              </button>
            </div>

            {/* Botão Copiar */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center space-x-1 text-[11px] font-bold"
              title="Copiar conteúdo markdown"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 text-[10px]">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline text-[10px]">Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Campo de Busca Rápida Dentro do Documento */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            placeholder="Pesquisar neste documento..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      {/* Área de Visualização do Conteúdo */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-mobile-card overflow-hidden">
        {viewMode === 'raw' ? (
          <pre className="text-[11px] font-mono text-slate-800 bg-slate-900 text-slate-100 p-3 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {currentDoc.content}
          </pre>
        ) : (
          <div className="prose prose-slate prose-sm max-w-none text-xs text-slate-700 leading-relaxed space-y-2">
            {currentDoc.content
              .split('\n\n')
              .filter(para => !docSearch || para.toLowerCase().includes(docSearch.toLowerCase()))
              .map((para, index) => {
                if (para.startsWith('# ')) {
                  return (
                    <h2 key={index} className="text-sm font-extrabold text-purple-900 border-b border-purple-100 pb-1 mt-3">
                      {para.replace('# ', '')}
                    </h2>
                  );
                }
                if (para.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-xs font-bold text-slate-900 mt-2.5">
                      {para.replace('## ', '')}
                    </h3>
                  );
                }
                if (para.startsWith('* ') || para.startsWith('- ')) {
                  const items = para.split('\n');
                  return (
                    <ul key={index} className="list-disc pl-4 space-y-1 text-slate-700 my-1">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^[\*\-]\s+/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index} className="text-slate-600 leading-relaxed">
                    {para}
                  </p>
                );
              })}
          </div>
        )}
      </div>

      {/* Card Informativo sobre Deploy na Vercel */}
      <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-start space-x-3 text-xs text-slate-600">
        <Terminal className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-slate-900 text-[11px]">Hospedagem e Deploy na Vercel</p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Configurado via <code className="bg-slate-200 px-1 py-0.2 rounded text-[10px]">vercel.json</code> com rewrites para Single Page Application e headers de segurança.
          </p>
        </div>
      </div>
    </div>
  );
}

