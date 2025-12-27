
import { ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { Bot, Search, Target, BarChart3, Settings } from "lucide-react";

function StepCard({ step, index, isExpanded, onToggle }) {    
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
