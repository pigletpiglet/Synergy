function sortCarByYearDescendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini
  result.sort((a, b) => {
    console.log()
    if (parseInt(a["year"]) < parseInt(b["year"])) {
      return 1;
    }
    else if (parseInt(a["year"]) > parseInt(b["year"])) {
      return -1;
    }
    else {
      return 0;
    }
  })

  // Rubah code ini dengan array hasil sorting secara descending
  return result;
}
