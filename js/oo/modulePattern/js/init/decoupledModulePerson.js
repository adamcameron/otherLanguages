var decoupledModulePerson = new ns.DecoupledModulePerson("zinzan", "brooke");
console.dir(decoupledModulePerson);
console.log(decoupledModulePerson.firstName);
console.log(decoupledModulePerson.lastName);
console.log(decoupledModulePerson.getFullName());
console.log(decoupledModulePerson.capitaliseName("tana umaga"));
console.log(JSON.stringify(decoupledModulePerson));
