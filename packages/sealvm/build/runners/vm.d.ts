export default class Vm {
    private projectPath;
    private containerPath;
    private sshPort;
    constructor(projectPath: string, containerPath: string, sshPort: number);
    private boot;
    static connect(): Promise<any>;
    static connectOnce(): Promise<any>;
    static create(projectPath: string, containerPath: string, sshPort: number): Promise<number>;
    static destroy(processId: number): Promise<void>;
}
