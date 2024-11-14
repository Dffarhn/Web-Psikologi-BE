export interface ExportStrategy {
    export(data: any): Promise<Buffer>;
}
