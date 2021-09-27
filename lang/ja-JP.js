export default async (context, locale) => {
  return await Promise.resolve({
    overview: '概要',
    stars: '出演者',
    projects: 'プロジェクト',
    chat: 'チャット',
    calender: 'カレンダー',
    settings: '設定',
    addTodo: 'タスクを追加',
    logout: 'ログアウト',
    thisWeek: '今週',
    search: '検索',
  });
};
