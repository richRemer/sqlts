```js
import {sql, iseq, set} from "https://unpkg.com/@esfn/sqlts@0.0.1/sqlts.js";

const table = "user";
const id = 42;
const group = null;
const fields = {fname: "Muhammad", lname: "Li"};

sql`select * from ${sql(table)} where id = ${id} and group ${iseq(group)}`;
// select * from user where id = 42 and group IS NULL

sql`update user set ${set(fields)} where id = ${id}`;
// update user set fname = 'Muhammad', lname = 'Li' where id = 42
```
