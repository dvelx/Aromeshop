// параметры для статических файлов
export const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["htm", "html", "css", "js"],
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res: { set: (arg0: string, arg1: number) => void; }, path: any, stat: any) {
    res.set("x-timestamp", Date.now());
  },
};
