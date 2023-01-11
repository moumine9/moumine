declare module "*.css" {
    const mapping: Record<string, string>;
    export default mapping;
}

declare module '*.yaml' {
    const content: { [key: string]: unknown }
    export default content
  }