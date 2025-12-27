class XRaySDK {
    constructor(executionId = null) {
      this.executionId =
        executionId ||
        `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.steps = [];
      this.metadata = {
        startTime: Date.now(),
        endTime: null
      };
    }
  
    recordStep(stepData) {
      const step = {
        id: `step_${this.steps.length + 1}`,
        timestamp: Date.now(),
        ...stepData
      };
      this.steps.push(step);
      return step;
    }
  
    finalize() {
      this.metadata.endTime = Date.now();
      this.metadata.duration =
        this.metadata.endTime - this.metadata.startTime;
      return this.getExecution();
    }
  
    getExecution() {
      return {
        executionId: this.executionId,
        metadata: this.metadata,
        steps: this.steps
      };
    }
  }
  
  export default XRaySDK;
  