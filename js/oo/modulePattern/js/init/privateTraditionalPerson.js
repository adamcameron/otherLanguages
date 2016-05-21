var privateTraditionalPerson = new ns.PrivateTraditionalPerson("helen", "clark");
console.dir(privateTraditionalPerson);
console.log(privateTraditionalPerson.firstName);
console.log(privateTraditionalPerson.lastName);
console.log(privateTraditionalPerson.getFullName());
console.log(ns.PrivateTraditionalPerson.capitaliseName("sian elias"));
console.log(JSON.stringify(privateTraditionalPerson));
