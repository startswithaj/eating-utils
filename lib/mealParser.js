// Generated by CoffeeScript 1.7.1
(function() {
  var DateParser, MealParser;

  require('sugar');

  DateParser = require('./dateParser');

  module.exports = MealParser = (function() {
    function MealParser(locale) {
      this.dateParser = new DateParser(locale);
      this.stripWords = ['calories', 'cal', 'cals', 'at'];
      this.reNumber = new RegExp("^[0-9][^\\/]*$");
    }

    MealParser.prototype.parseMeal = function(text) {
      var calories, date, dateStr, foods, important, number, timeStr, word, words, _i, _j, _len, _len1, _ref;
      foods = [];
      calories = [];
      important = text.indexOf('!') > -1 || text.indexOf('*') > -1;
      text = text.replace('!', '');
      text = text.replace('*', '');
      text = text.replace('  ', ' ');
      text = text.replace(' and ', " & ");
      dateStr = this.dateParser.parseDate(text, true);
      text = text.replace(dateStr, '');
      timeStr = this.dateParser.parseTime(text);
      text = text.replace(timeStr, '');
      date = this.dateParser.parseDateAndTimeToDate(dateStr, timeStr);
      _ref = this.stripWords;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        text = text.replace(new RegExp("\\b" + word + "\\b", "g"), "");
      }
      text = text.replace(/\s+/g, " ");
      text = text.trim();
      words = text.split(" ");
      for (_j = 0, _len1 = words.length; _j < _len1; _j++) {
        word = words[_j];
        number = word.match(this.reNumber);
        if (number = parseInt(number, 10)) {
          if (word.indexOf('c') !== -1) {
            calories.push(number);
            continue;
          }
          if (number <= 10) {
            foods.push(number);
            continue;
          }
          calories.push(parseInt(number, 10));
          continue;
        }
        foods.push(word.length > 1 ? word.capitalize(true) : word);
      }
      foods = foods.join(' ');
      calories = calories.sum();
      return {
        date: date,
        foods: foods,
        calories: calories,
        important: important
      };
    };

    return MealParser;

  })();

}).call(this);
