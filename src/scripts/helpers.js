import axios from "axios";
export function changePage(page) {
  window.location.href = page;
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.addHours = function (hours) {
  const date = new Date(this.valueOf());
  date.setDate(date.getHours() + hours);
  return date;
};

export function filterListBySearch(substring, listComplete) {
  let listTemp = [...listComplete];
  listTemp = listTemp.filter((object) => {
    let found = 0;
    Object.keys(object).forEach((key) => {
      let propLC = object[key].toString().toLowerCase();
      if (propLC.includes(substring)) {
        found = 1;
      }
    });
    return found;
  });
  return listTemp;
}

export function filterListByProps(key, values, listComplete) {
  let listTemp = [...listComplete];
  listTemp = listTemp.filter((object) => {
    return values.includes(object[key]);
  });
  return listTemp;
}

export function filterListByDateInterval(key, from, to, listComplete) {
  let listTemp = [...listComplete];
  listTemp = listTemp.filter((object) => {
    return (
      new Date(object[key]).getDate() >= new Date(from).getDate() &&
      new Date(object[key]).getDate() <= new Date(to).getDate()
    );
  });
  return listTemp;
}

export function compareByTitle(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
}

export function compareByTitleDesc(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return 1;
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function compareByClassroomId(a, b) {
  if (a.classroom_id < b.classroom_id) {
    return -1;
  }
  if (a.classroom_id > b.classroom_id) {
    return 1;
  }
  return 0;
}

export function compareByClassroomIdDesc(a, b) {
  if (a.classroom_id < b.classroom_id) {
    return 1;
  }
  if (a.classroom_id > b.classroom_id) {
    return -1;
  }
  return 0;
}

export function compareByDeadline(a, b) {
  if (new Date(a.deadline).getTime() < new Date(b.deadline).getTime()) {
    return -1;
  }
  if (new Date(a.deadline).getTime() > new Date(b.deadline).getTime()) {
    return 1;
  }
  return 0;
}

export function compareByDeadlineDesc(a, b) {
  if (new Date(a.deadline).getTime() < new Date(b.deadline).getTime()) {
    return 1;
  }
  if (new Date(a.deadline).getTime() > new Date(b.deadline).getTime()) {
    return -1;
  }
  return 0;
}

export function compareByName(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

export function compareByNameDesc(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return 1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function getApiConfig() {
  return {
    baseUrl: "http://localhost:3001/",
    headers: {
      "Content-type": "application/json",
    },
  };
}

export function getIdxOfHomeworkById(homework_id, homeworkListComplete) {
  for (let i = 0; i < homeworkListComplete.length; i++) {
    if (homeworkListComplete[i].homework_id == homework_id) {
      // console.log(homeworkListComplete[i].homework_id, homework_id, i);
      return i;
    }
  }
}
export function getIdxOfClassroomById(classroom_id, classroomListComplete) {
  for (let i = 0; i < classroomListComplete.length; i++) {
    if (classroomListComplete[i].classroom_id == classroom_id) {
      // console.log(classroomListComplete[i].classroom_id, classroom_id, i);
      return i;
    }
  }
}

export function getObjectByDate(date, list, key) {
  let listTemp = [];
  for (let i = 0; i < list.length; i++) {
    let dateProp = new Date(list[i][key]);
    let dateParam = new Date(date);
    if (
      dateParam.getDate() == dateProp.getDate() &&
      dateParam.getMonth() == dateProp.getMonth() &&
      dateParam.getYear() == dateProp.getYear()
    ) {
      listTemp.push(list[i]);
    } else if (
      list[i].recurring === "weekly" &&
      dateProp <= dateParam &&
      dateParam.getDay() == dateProp.getDay()
    ) {
      listTemp.push(list[i]);
    } else if (
      list[i].recurring === "monthly" &&
      dateProp <= dateParam &&
      dateParam.getDate() == dateProp.getDate()
    ) {
      listTemp.push(list[i]);
    }
  }
  return listTemp;
}

export function getObjectByMonth(date, list, key) {
  let listTemp = [];
  for (let i = 0; i < list.length; i++) {
    let dateProp = new Date(list[i][key]);
    let dateParam = new Date(date);
    if (
      dateParam.getMonth() == dateProp.getMonth() &&
      dateParam.getYear() == dateProp.getYear()
    ) {
      listTemp.push(list[i]);
    }
  }
  return listTemp;
}

export function keepOneActive(active, current, activeClass) {
  console.log(current);
  if (current === active) {
    current.classList.remove(activeClass);
  } else {
    if (active) {
      current.classList.add(activeClass);
      active.classList.remove(activeClass);
    } else {
      current.classList.add(activeClass);
    }
  }
}

export function getLocation(location, params) {
  const basePath = location.pathname;
  const search = new URLSearchParams(location.search);
  let path = basePath + "?";
  search.forEach(function (value, key) {
    if (!params[key]) {
      params[key] = value;
    }
  });
  Object.keys(params).forEach(function (key, i) {
    if (i > 0) {
      path += "&";
    }
    path += key + "=" + params[key];
  });
  return path;
}
