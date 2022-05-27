interface IEllipsis {
  str: string;
  limit?: number;
  dots?: string;
}

export const ellipsisCenter = (payload: IEllipsis) => {
  const { str, limit = 10, dots = "..." }: IEllipsis = payload;
  try {
    const size = str.length;
    if (size < limit * 2 + dots.length) {
      return str;
    }
    const leftStr = str.substring(0, limit);
    const rightStr = str.substring(size - limit, size);
    return leftStr + dots + rightStr;
  } catch {
    return str;
  }
};
