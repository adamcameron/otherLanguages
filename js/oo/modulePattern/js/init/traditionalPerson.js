var traditionalPerson = new ns.TraditionalPerson("kiri", "te kanawa");
console.dir(traditionalPerson);
console.log(traditionalPerson.firstName);
console.log(traditionalPerson.lastName);
console.log(traditionalPerson.getFullName());
console.log(ns.TraditionalPerson.capitaliseName("jean batten"));
console.log(JSON.stringify(traditionalPerson));
