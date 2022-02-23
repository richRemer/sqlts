export default sql;

export function iseq(value) {
  value = evaluate(value);

  switch (value.toUpperCase()) {
    case "NULL":
    case "TRUE":
    case "FALSE":
      return sql(`IS ${value.toUpperCase()}`);
    default:
      return `= ${value}`;
  }
}

export function set(values) {
  const entries = Object.entries(values);
  return sql(entries.map(([k,v]) => sql`${sql(k)} = ${v}`).join(", "));
}

export function sql(strings, ...values) {
  if (values.length) {
    const final = strings[strings.length-1];
    return sql(values.map(evaluate).map((v,i) => strings[i]+v).join("") + final);
  } else if (typeof strings === "string") {
    return Object.assign(new String(strings), {sql: true});
  } else if (strings.sql) {
    return strings;
  } else {
    return Object.assign(new String(strings[0]), {sql: true});
  }
}

function evaluate(value) {
  if (value?.sql) {
    return String(value);
  } else if (value === null || value === undefined) {
    return "NULL";
  } else if (typeof value === "string") {
    return `'${value.replace(/'/g, "''")}'`;
  } else if (value === true) {
    return 'TRUE';
  } else if (value === false) {
    return 'FALSE';
  } else if (Number.isInteger(value)) {
    return String(value);
  } else if (Number.isFinite(value)) {
    return String(value);
  } else if (typeof value === "number") {
    throw new Error(`invalid numeric value '${value}'`);
  } else if (typeof value === "symbol") {
    throw new Error(`invalid symbol value '${value}'`);
  } else if (value instanceof Date) {
    return `'${value.toISOString()}'`;
  } else if (typeof value.valueOf === "function" && value !== value.valueOf()) {
    return evaluate(value.valueOf());
  } else if (typeof value.toString === "function" && value.toString !== Object.prototype.toString) {
    return evaluate(String(value));
  } else {
    throw new Error(`invalid ${typeof value} value '${value}'`);
  }
}
