function arrayDiff(mine, their) {
  if (!Array.isArray(mine)) {
    return false;
  }
  if (!Array.isArray(their)) {
    return true;
  }
  let changes = [];
  mine.forEach((item) => {
    if (!their) {
      changes = [...changes, item];
    } else {
      const { id, local_id } = item;
      const theirItem = id
        ? their.find((o) => o.id === id)
        : local_id
        ? their.find((o) => o.local_id === local_id)
        : null;
      if (!theirItem) {
        changes = [...changes, item];
      }
    }
  });
  return changes.length > 0;
}

export function diff(mine, their) {
  // Compare 2 object and return the diffrent
  // Just compare their attributes only, it does not take nested compare
  const mine_keys = mine
    ? Object.keys(mine).filter((key) => key !== "id" && key !== "local_id")
    : [];
  const their_keys = their
    ? Object.keys(their).filter((key) => key !== "id" && key !== "local_id")
    : [];
  const keys = [...mine_keys, ...their_keys];
  let data = null;
  keys.forEach(function (key) {
    const mineValue = mine[key];
    const theirValue = their[key];
    if (!their || mineValue !== theirValue) {
      if (arrayDiff(mineValue, theirValue)) {
        data = data ? { ...data, [key]: mineValue } : { [key]: mineValue };
      } else if (mineValue instanceof Blob) {
        data = data ? { ...data, [key]: mineValue } : { [key]: mineValue };
      } else if (mineValue && typeof mineValue === "object") {
        //Todo:
      } else {
        data = data ? { ...data, [key]: mineValue } : { [key]: mineValue };
      }
    }
  });
  if (mine.id && data) {
    data = { ...data, id: mine.id };
  }
  return data;
}
