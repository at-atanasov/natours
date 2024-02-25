class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    console.log(this.queryString);

    const queryObj = { ...this.queryString }; // деструктурираме рикуеста и създаваме нов обект с полетата му
    const excludedFields = ['page', 'sort', 'limit', 'fields']; // създаваме масив с полетата, които искаме да избегнем
    excludedFields.forEach((el) => delete queryObj[el]); // с форийч обикаляме полетата и ги изтриваме от обекта ако ги има

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    //let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); // ако искаме да ги сортираме низходящо слагме "-" пред името на полето в постман
      //ако искаме да сортираме по второ поле в случай ще стойността в първото е еднаква, подаваме второто поле със запетая след първото в постман.
      //След това я заменяме със спейс за mongoose.
    } else {
      this.query = this.query.sort('-createdAt'); //we use as default sort
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //we exclude that field. It is created by mongoose by default.
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // като умножаваме по 1 превръщаме стринга в число. След '||' стои дефолтна стойност.
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
