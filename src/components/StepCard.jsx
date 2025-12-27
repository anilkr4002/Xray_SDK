// import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// function StepCard({ step, index, isExpanded, onToggle }) {
//   return (
//     <div className="border rounded-lg p-4 bg-white">
//       <div className="flex justify-between cursor-pointer" onClick={onToggle}>
//         <h3 className="font-semibold">
//           Step {index + 1}: {step.step.replace(/_/g, " ")}
//         </h3>
//         {isExpanded ? <ChevronDown /> : <ChevronRight />}
//       </div>

//       {isExpanded && (
//         <pre className="mt-3 text-xs bg-gray-50 p-3 rounded">
//           {JSON.stringify(step, null, 2)}
//         </pre>
//       )}
//     </div>
//   );
// }

// export default StepCard;



// import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// function StepCard({ step, index, isExpanded, onToggle }) {
//   return (
//     <div className="border-2 rounded-lg p-4 bg-white">
//       {/* Header */}
//       <div
//         className="flex justify-between cursor-pointer"
//         onClick={onToggle}
//       >
//         <h3 className="font-semibold text-lg">
//           Step {index + 1}: {step.step.replace(/_/g, " ")}
//         </h3>
//         {isExpanded ? <ChevronDown /> : <ChevronRight />}
//       </div>

//       {/* Reasoning */}
//       {step.reasoning && (
//         <p className="text-sm text-gray-600 mt-1">
//           {step.reasoning}
//         </p>
//       )}

//       {/* Expanded Content */}
//       {isExpanded && (
//         <div className="mt-4 space-y-4">
//           {/* Input */}
//           {step.input && (
//             <div>
//               <h4 className="font-medium text-sm mb-1">📥 Input</h4>
//               <pre className="bg-gray-50 p-3 rounded text-xs">
//                 {JSON.stringify(step.input, null, 2)}
//               </pre>
//             </div>
//           )}

//           {/* Filter Evaluations */}
//           {step.evaluations && (
//             <div>
//               <h4 className="font-medium text-sm mb-2">🎯 Filter Results</h4>
//               <div className="space-y-2">
//                 {step.evaluations.map((e, i) => (
//                   <div
//                     key={i}
//                     className={`p-3 rounded border-l-4 ${
//                       e.qualified
//                         ? "border-green-500 bg-green-50"
//                         : "border-red-500 bg-red-50"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       {e.qualified ? (
//                         <CheckCircle size={14} className="text-green-600" />
//                       ) : (
//                         <XCircle size={14} className="text-red-600" />
//                       )}
//                       <span className="text-sm font-medium">
//                         {e.title}
//                       </span>
//                     </div>
//                     <div className="text-xs text-gray-600 mt-1">
//                       ${e.price} • {e.rating}★ • {e.reviews} reviews
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Output */}
//           {step.output && (
//             <div>
//               <h4 className="font-medium text-sm mb-1">📤 Output</h4>
//               <pre className="bg-gray-50 p-3 rounded text-xs">
//                 {JSON.stringify(step.output, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StepCard;


// import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// // Step Card Component
// function StepCard({ step, index, isExpanded, onToggle }) {
//   const getStepIcon = (type) => {
//     switch (type) {
//       case "llm": return "🤖";
//       case "api": return "🔍";
//       case "filter": return "🎯";
//       case "ranking": return "📊";
//       default: return "⚙️";
//     }
//   };

//   const getStepColor = (type) => {
//     switch (type) {
//       case "llm": return "bg-purple-50 border-purple-200";
//       case "api": return "bg-blue-50 border-blue-200";
//       case "filter": return "bg-green-50 border-green-200";
//       case "ranking": return "bg-orange-50 border-orange-200";
//       default: return "bg-gray-50 border-gray-200";
//     }
//   };

//   return (
//     <div className={`border-2 rounded-lg p-4 ${getStepColor(step.type)}`}>
//       {/* Header */}
//       <div
//         className="flex items-start justify-between cursor-pointer"
//         onClick={onToggle}
//       >
//         <div className="flex items-start gap-3 flex-1">
//           <div className="text-2xl">{getStepIcon(step.type)}</div>

//           <div className="flex-1">
//             <div className="flex items-center gap-2">
//               <h3 className="font-semibold text-lg">
//                 Step {index + 1}:{" "}
//                 {step.step
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase())}
//               </h3>

//               <span className="text-xs px-2 py-1 bg-white rounded-full border">
//                 {step.type}
//               </span>
//             </div>

//             {/* ✅ KEEP REASONING */}
//             {step.reasoning && (
//               <p className="text-sm text-gray-600 mt-1">
//                 {step.reasoning}
//               </p>
//             )}
//           </div>
//         </div>

//         <button className="text-gray-400 hover:text-gray-600">
//           {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//         </button>
//       </div>

//       {/* Expanded Content */}
//       {isExpanded && (
//         <div className="mt-4 space-y-4 border-t pt-4">
//           {/* Input */}
//           {step.input && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">📥 Input</h4>
//               <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
//                 {JSON.stringify(step.input, null, 2)}
//               </pre>
//             </div>
//           )}

//           {/* Filter Evaluations */}
//           {step.evaluations && step.output?.passed !== undefined && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">
//                 🎯 Filter Evaluations ({step.output.passed} passed,{" "}
//                 {step.output.failed} failed)
//               </h4>

//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {step.evaluations.map((item, i) => (
//                   <div
//                     key={i}
//                     className={`p-3 rounded border-l-4 ${
//                       item.qualified
//                         ? "bg-green-50 border-green-500"
//                         : "bg-red-50 border-red-500"
//                     }`}
//                   >
//                     <div className="flex items-start gap-2">
//                       {item.qualified ? (
//                         <CheckCircle size={16} className="text-green-600 mt-0.5" />
//                       ) : (
//                         <XCircle size={16} className="text-red-600 mt-0.5" />
//                       )}

//                       <div className="flex-1">
//                         <div className="font-medium text-sm">
//                           {item.title}
//                         </div>

//                         <div className="text-xs text-gray-600 mt-1">
//                           ${item.price} • {item.rating}★ •{" "}
//                           {item.reviews.toLocaleString()} reviews
//                         </div>

//                         <div className="mt-2 space-y-1 text-xs">
//                           {Object.entries(item.filter_results).map(
//                             ([key, result]) => (
//                               <div key={key} className="flex items-start gap-2">
//                                 {result.passed ? (
//                                   <CheckCircle
//                                     size={12}
//                                     className="text-green-600 mt-0.5"
//                                   />
//                                 ) : (
//                                   <XCircle
//                                     size={12}
//                                     className="text-red-600 mt-0.5"
//                                   />
//                                 )}
//                                 <span
//                                   className={
//                                     result.passed
//                                       ? "text-green-700"
//                                       : "text-red-700"
//                                   }
//                                 >
//                                   {result.detail}
//                                 </span>
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Ranked Candidates */}
//           {step.ranked_candidates && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">
//                 🏆 Ranked Candidates
//               </h4>

//               <div className="space-y-2">
//                 {step.ranked_candidates.map((candidate, i) => (
//                   <div key={i} className="bg-white p-3 rounded border">
//                     <div className="flex items-center gap-2">
//                       <span className="font-bold text-lg">
//                         #{candidate.rank}
//                       </span>

//                       <div className="flex-1">
//                         <div className="font-medium text-sm">
//                           {candidate.title}
//                         </div>
//                         <div className="text-xs text-gray-600">
//                           ${candidate.metrics.price} •{" "}
//                           {candidate.metrics.rating}★ •{" "}
//                           {candidate.metrics.reviews.toLocaleString()} reviews
//                         </div>
//                       </div>

//                       <div className="text-right">
//                         <div className="font-bold text-blue-600">
//                           {candidate.total_score.toFixed(2)}
//                         </div>
//                         <div className="text-xs text-gray-500">score</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Output */}
//           {step.output && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">📤 Output</h4>
//               <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
//                 {JSON.stringify(step.output, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StepCard;


// import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// function StepCard({ step, index, isExpanded, onToggle }) {
//   const getStepIcon = (type) => {
//     switch (type) {
//       case "llm": return "🤖";
//       case "api": return "🔍";
//       case "filter": return "🎯";
//       case "ranking": return "📊";
//       default: return "⚙️";
//     }
//   };

//   const getStepColor = (type) => {
//     switch (type) {
//       case "llm": return "bg-purple-50 border-purple-200";
//       case "api": return "bg-blue-50 border-blue-200";
//       case "filter": return "bg-green-50 border-green-200";
//       case "ranking": return "bg-orange-50 border-orange-200";
//       default: return "bg-gray-50 border-gray-200";
//     }
//   };

//   return (
//     <div className={`border-2 rounded-lg p-4 ${getStepColor(step.type)}`}>
//       {/* Header */}
//       <div
//         className="flex items-start justify-between cursor-pointer"
//         onClick={onToggle}
//       >
//         <div className="flex items-start gap-3 flex-1">
//           <div className="text-2xl">{getStepIcon(step.type)}</div>
//           <div className="flex-1">
//             <div className="flex items-center gap-2">
//               <h3 className="font-semibold text-lg">
//                 Step {index + 1}:{" "}
//                 {step.step
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase())}
//               </h3>
//               <span className="text-xs px-2 py-1 bg-white rounded-full border">
//                 {step.type}
//               </span>
//             </div>

//             {/* Reasoning (VERY IMPORTANT) */}
//             {step.reasoning && (
//               <p className="text-sm text-gray-600 mt-1">
//                 {step.reasoning}
//               </p>
//             )}
//           </div>
//         </div>

//         <button className="text-gray-400 hover:text-gray-600">
//           {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//         </button>
//       </div>

//       {/* Expanded Content */}
//       {isExpanded && (
//         <div className="mt-4 space-y-3 border-t pt-4">
//           {/* Input */}
//           {step.input && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">📥 Input</h4>
//               <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
//                 {JSON.stringify(step.input, null, 2)}
//               </pre>
//             </div>
//           )}

//           {/* Filter Evaluations */}
//           {step.evaluations && step.output && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">
//                 🎯 Filter Evaluations ({step.output.passed} passed,{" "}
//                 {step.output.failed} failed)
//               </h4>

//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {step.evaluations.map((evalItem, i) => (
//                   <div
//                     key={i}
//                     className={`p-3 rounded border-l-4 ${
//                       evalItem.qualified
//                         ? "bg-green-50 border-green-500"
//                         : "bg-red-50 border-red-500"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       {evalItem.qualified ? (
//                         <CheckCircle size={16} className="text-green-600" />
//                       ) : (
//                         <XCircle size={16} className="text-red-600" />
//                       )}
//                       <span className="font-medium text-sm">
//                         {evalItem.title}
//                       </span>
//                     </div>

//                     <div className="text-xs text-gray-600 mt-1">
//                       ${evalItem.price} • {evalItem.rating}★ •{" "}
//                       {evalItem.reviews.toLocaleString()} reviews
//                     </div>

//                     <div className="mt-2 space-y-1 text-xs">
//                       {Object.entries(evalItem.filter_results).map(
//                         ([key, result]) => (
//                           <div key={key} className="flex items-start gap-2">
//                             {result.passed ? (
//                               <CheckCircle size={12} className="text-green-600" />
//                             ) : (
//                               <XCircle size={12} className="text-red-600" />
//                             )}
//                             <span
//                               className={
//                                 result.passed
//                                   ? "text-green-700"
//                                   : "text-red-700"
//                               }
//                             >
//                               {result.detail}
//                             </span>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Ranked Candidates */}
//           {step.ranked_candidates && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">
//                 🏆 Ranked Candidates
//               </h4>
//               <div className="space-y-2">
//                 {step.ranked_candidates.map((c, i) => (
//                   <div key={i} className="bg-white p-3 rounded border">
//                     <div className="flex items-center gap-2">
//                       <span className="font-bold text-lg">#{c.rank}</span>
//                       <div className="flex-1">
//                         <div className="font-medium text-sm">{c.title}</div>
//                         <div className="text-xs text-gray-600">
//                           ${c.metrics.price} • {c.metrics.rating}★ •{" "}
//                           {c.metrics.reviews.toLocaleString()} reviews
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="font-bold text-blue-600">
//                           {c.total_score.toFixed(2)}
//                         </div>
//                         <div className="text-xs text-gray-500">score</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Output */}
//           {step.output && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-700 mb-2">📤 Output</h4>
//               <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
//                 {JSON.stringify(step.output, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StepCard;

// import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";

// function StepCard({ step, index, isExpanded, onToggle }) {
//   const getStepIcon = (type) => {
//     switch (type) {
//       case "llm": return "🤖";
//       case "api": return "🔍";
//       case "filter": return "🎯";
//       case "ranking": return "📊";
//       default: return "⚙️";
//     }
//   };

//   const getStepColor = (type) => {
//     switch (type) {
//       case "llm": return "bg-purple-50 border-purple-200";
//       case "api": return "bg-blue-50 border-blue-200";
//       case "filter": return "bg-green-50 border-green-200";
//       case "ranking": return "bg-orange-50 border-orange-200";
//       default: return "bg-gray-50 border-gray-200";
//     }
//   };

//   return (
//     <div className={`border-2 rounded-lg p-4 ${getStepColor(step.type)}`}>
//       {/* Header */}
//       <div className="flex items-start justify-between cursor-pointer" onClick={onToggle}>
//         <div className="flex items-start gap-3 flex-1">
//           <div className="text-2xl">{getStepIcon(step.type)}</div>
//           <div className="flex-1">
//             <h3 className="font-semibold text-lg">
//               Step {index + 1}:{" "}
//               {step.step.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">{step.reasoning}</p>
//           </div>
//         </div>
//         {isExpanded ? <ChevronDown /> : <ChevronRight />}
//       </div>

//       {/* Expanded */}
//       {isExpanded && (
//         <div className="mt-4 space-y-4 border-t pt-4">

//           {/* Input */}
//           {step.input && (
//             <div>
//               <h4 className="font-medium text-sm mb-2">📥 Input</h4>
//               <pre className="bg-white p-3 rounded border text-xs">
//                 {JSON.stringify(step.input, null, 2)}
//               </pre>
//             </div>
//           )}

//           {/* Filter Evaluations */}
//           {step.evaluations && step.output && (
//             <div>
//               <h4 className="font-medium text-sm mb-2">
//                 🎯 Filter Evaluations ({step.output.passed} passed, {step.output.failed} failed)
//               </h4>

//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {step.evaluations.map((evalItem, i) => (
//                   <div
//                     key={i}
//                     className={`p-3 rounded border-l-4 ${
//                       evalItem.qualified
//                         ? "bg-green-50 border-green-500"
//                         : "bg-red-50 border-red-500"
//                     }`}
//                   >
//                     <div className="font-medium text-sm">{evalItem.title}</div>
//                     <div className="text-xs text-gray-600">
//                       ${evalItem.price} • {evalItem.rating}★ •{" "}
//                       {evalItem.reviews.toLocaleString()} reviews
//                     </div>

//                     <div className="mt-2 space-y-1 text-xs">
//                       {evalItem.filter_results &&
//                         typeof evalItem.filter_results === "object" &&
//                         Object.entries(evalItem.filter_results).map(
//                           ([key, result]) => (
//                             <div key={key} className="flex items-start gap-2">
//                               {result.passed ? (
//                                 <CheckCircle size={12} className="text-green-600" />
//                               ) : (
//                                 <XCircle size={12} className="text-red-600" />
//                               )}
//                               <span
//                                 className={
//                                   result.passed
//                                     ? "text-green-700"
//                                     : "text-red-700"
//                                 }
//                               >
//                                 {result.detail}
//                               </span>
//                             </div>
//                           )
//                         )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Ranked Candidates */}
//           {step.ranked_candidates && (
//             <div>
//               <h4 className="font-medium text-sm mb-2">🏆 Ranked Candidates</h4>
//               {step.ranked_candidates.map((c, i) => (
//                 <div key={i} className="bg-white p-3 rounded border mb-2">
//                   <strong>#{c.rank}</strong> {c.title} — Score {c.total_score.toFixed(2)}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Output */}
//           {step.output && (
//             <div>
//               <h4 className="font-medium text-sm mb-2">📤 Output</h4>
//               <pre className="bg-white p-3 rounded border text-xs">
//                 {JSON.stringify(step.output, null, 2)}
//               </pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StepCard;


import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { Bot, Search, Target, BarChart3, Settings } from "lucide-react";

function StepCard({ step, index, isExpanded, onToggle }) {
//   const getStepIcon = (type) => {
//     switch (type) {
//       case "llm": return "🤖";
//       case "api": return "🔍";
//       case "filter": return "🎯";
//       case "ranking": return "📊";
//       default: return "⚙️";
//     }
//   };
    
   const getStepIcon = (type) => {
    switch(type) {
        case 'llm': return <Bot size={24} />;
        case 'api': return <Search size={24} />;
        case 'filter': return <Target size={24} />;
        case 'ranking': return <BarChart3 size={24} />;
        default: return <Settings size={24} />;
    }
   };  

  const getStepColor = (type) => {
    switch (type) {
      case "llm": return "bg-purple-50 border-purple-200";
      case "api": return "bg-blue-50 border-blue-200";
      case "filter": return "bg-green-50 border-green-200";
      case "ranking": return "bg-orange-50 border-orange-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 transition-all ${getStepColor(step.type)}`}>
      
      {/* Header */}
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl">{getStepIcon(step.type)}</div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">
                Step {index + 1}:{" "}
                {step.step.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
              </h3>

              {/* Missing badge added */}
              <span className="text-xs px-2 py-0.5 bg-white rounded-full border">
                {step.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {step.reasoning}
            </p>
          </div>
        </div>

        {/* Hover + size polish */}
        <button className="text-gray-400 hover:text-gray-600">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div className="mt-4 space-y-4 border-t pt-4">

          {/* Input */}
          {step.input && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">📥 Input</h4>
              <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
                {JSON.stringify(step.input, null, 2)}
              </pre>
            </div>
          )}

          {/* Filter Evaluations */}
          {step.evaluations && step.output && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                <Target size={24} /> Filter Evaluations ({step.output.passed} passed, {step.output.failed} failed)
              </h4>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {step.evaluations.map((evalItem, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded border-l-4 ${
                      evalItem.qualified
                        ? "bg-green-50 border-green-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {evalItem.qualified ? (
                        <CheckCircle size={16} className="text-green-600 mt-0.5" />
                      ) : (
                        <XCircle size={16} className="text-red-600 mt-0.5" />
                      )}

                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {evalItem.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          ${evalItem.price} • {evalItem.rating}★ •{" "}
                          {evalItem.reviews.toLocaleString()} reviews
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1 text-xs">
                      {Object.entries(evalItem.filter_results || {}).map(
                        ([key, result]) => (
                          <div key={key} className="flex items-start gap-2">
                            {result.passed ? (
                              <CheckCircle size={12} className="text-green-600 mt-0.5" />
                            ) : (
                              <XCircle size={12} className="text-red-600 mt-0.5" />
                            )}
                            <span
                              className={result.passed ? "text-green-700" : "text-red-700"}
                            >
                              {result.detail}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ranked Candidates */}
          {step.ranked_candidates && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">🏆 Ranked Candidates</h4>

              <div className="space-y-2">
                {step.ranked_candidates.map((c, i) => (
                  <div key={i} className="bg-white p-3 rounded border flex items-center gap-3">
                    <span className="font-bold text-lg">#{c.rank}</span>

                    <div className="flex-1">
                      <div className="font-medium text-sm">{c.title}</div>
                      <div className="text-xs text-gray-600">
                        ${c.metrics?.price} • {c.metrics?.rating}★ •{" "}
                        {c.metrics?.reviews?.toLocaleString()} reviews
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {c.total_score.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          {step.output && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">📤 Output</h4>
              <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
                {JSON.stringify(step.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StepCard;
