

import { useEffect, useState } from "react";
import runCompetitorSelectionDemo from "../demo/competitorDemo";
// import StepCard from "../components/StepCard";
import StepCard from "../components/StepCard";

import { Play, Clock, Search } from "lucide-react";



// Main Dashboard Component
function Dashboard() {
    const [executions, setExecutions] = useState([]);
    const [selectedExecution, setSelectedExecution] = useState(null);
    const [expandedSteps, setExpandedSteps] = useState(new Set([0]));
  
    useEffect(() => {
      // Load initial demo execution
      const demo = runCompetitorSelectionDemo();
      setExecutions([demo]);
      setSelectedExecution(demo);
    }, []);
  
    const runNewDemo = () => {
      const demo = runCompetitorSelectionDemo();
      setExecutions([demo, ...executions]);
      setSelectedExecution(demo);
      setExpandedSteps(new Set([0]));
    };
  
    const toggleStep = (index) => {
      const newExpanded = new Set(expandedSteps);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      setExpandedSteps(newExpanded);
    };
  
    const expandAll = () => {
      if (selectedExecution) {
        setExpandedSteps(new Set(selectedExecution.steps.map((_, i) => i)));
      }
    };
  
    const collapseAll = () => {
      setExpandedSteps(new Set());
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">X-Ray Debugger</h1>
                <p className="text-sm text-gray-600">Multi-step decision transparency & debugging</p>
              </div>
              <button
                onClick={runNewDemo}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play size={16} />
                Run New Demo
              </button>
            </div>
          </div>
        </div>
  
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar - Execution List */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  Recent Executions
                </h2>
                <div className="space-y-2">
                  {executions.map((exec) => (
                    <button
                      key={exec.executionId}
                      onClick={() => {
                        setSelectedExecution(exec);
                        setExpandedSteps(new Set([0]));
                      }}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedExecution?.executionId === exec.executionId
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-mono text-xs text-gray-600 truncate">
                        {exec.executionId}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {exec.steps.length} steps • {exec.metadata.duration}ms
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Main Content - Execution Detail */}
            <div className="col-span-9">
              {selectedExecution ? (
                <div className="space-y-4">
                  {/* Execution Header */}
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          Competitor Selection Pipeline
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Execution ID: <span className="font-mono">{selectedExecution.executionId}</span>
                        </p>
                        <div className="flex gap-4 mt-3 text-sm">
                          <div>
                            <span className="text-gray-600">Steps:</span>{' '}
                            <span className="font-semibold">{selectedExecution.steps.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration:</span>{' '}
                            <span className="font-semibold">{selectedExecution.metadata.duration}ms</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={expandAll}
                          className="text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
                        >
                          Expand All
                        </button>
                        <button
                          onClick={collapseAll}
                          className="text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
                        >
                          Collapse All
                        </button>
                      </div>
                    </div>
                  </div>
  
                  {/* Steps */}
                  <div className="space-y-4">
                    {selectedExecution.steps.map((step, index) => (
                      <StepCard
                        key={step.id}
                        step={step}
                        index={index}
                        isExpanded={expandedSteps.has(index)}
                        onToggle={() => toggleStep(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">Select an execution to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dashboard;