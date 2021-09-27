export interface Todo {
  id?: string;
  title: string;
  content: string[] | string;
  team: object;
  status: 'none' | 'created' | 'process' | 'completed';
  projectId: string;
}
