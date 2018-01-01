let domElements;

// create a starter palette or load a saved palette
let palette = {
  primary: {
    targets: [],
    color: null
  },
  secondary: {
    targets: [],
    color: null
  }
}

// for every group in the palette, apply it's color to each of it's targets
function applyPalette() {
  let groups = Object.keys(palette);

  groups.forEach(function(group) {
    palette[group].targets.forEach(function (target) {
      $(domElements[target.element]).css(target.attribute, palette[group].color);
    })
  })
}

// set the values of the group selectors to the palette keys
function populateGroupSelectors() {
  $('#groupSelector').empty();
  $('#pickGroup').empty();

  let groups = Object.keys(palette);

  groups.forEach(function(group) {
    $('#groupSelector').append($("<option></option>").attr("value", group).text(group));
    $('#pickGroup').append($("<option></option>").attr("value", group).text(group));
  })
}

populateGroupSelectors();

// apply a unique id to each html element in the iFrame
function applyIds() {
  domElements.each(function (index) {
    $(this).data('dom-id', index);
  });
}

// truncate text if it is longer than some max
function truncate(text) {
  let maxLength = 25;
  if (text.length < maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength).concat('...');
  }
}

// add all of the ancestors of the selected element to the parent selector
function populateParentSelector(target) {
  elementOptions = []
  $('#elementSelector').empty();
  elementOptions.push(target);

  // remove the root html element
  let parents = $(target).parents().toArray().slice(0,-1);

  parents.forEach(function (element) {
    elementOptions.push(element);
  })

  elementOptions.forEach(function(element, index) {
    $('#elementSelector').append($("<option></option>").attr("value", index).text(truncate(element.outerHTML.trim())));
  })
}

// update information for the selected element
function setSelected(target) {
  $('#selectedType').text($(target).prop('tagName'));
  $('#selectedId').text($(target).prop('id'));
  $('#selectedClass').text($(target).prop('class'));
  $('#selectedContent').text(truncate($(target).html().trim()));
}

// change which iFrame element is highlighted
let previous = {};
function highlight(target) {
  if (previous.element) $(previous.element).css('border', previous.border);
  previous.border = $(target).css('border');
  previous.element = target;
  if (target) $(target).css('border', '1px solid red');
}

// wait for the iFrame to load
$('iframe').on('load', function() {
  // change selected element when an iFrame element is clicked
  $('iframe').contents().find('body').click(function (event) {
    event.preventDefault();

    setSelected(event.target);

    populateParentSelector(event.target);
  })

  // highlight iFrame elements on mouse over
  $('iframe').contents().find('body').mousemove(function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target != previous.element) highlight(event.target);
  })

  $('iframe').contents().find('body').mouseleave(function(event) {
    event.preventDefault();
    event.stopPropagation();
    highlight();
  })

  // index all iFrame elements and give them ids
  let iframeBody = $('iframe').contents().find('body');
  domElements = iframeBody.add(iframeBody.find('*'));

  applyIds();
})

// assign an elements attribute to a palette group
$('#assign').click(function() {
  let element = $(elementOptions[$('#elementSelector').val()]).data('dom-id');
  let attribute = $('#attributeSelector').val();
  let groups = Object.keys(palette);

  groups.forEach(function(key) {
    let targets = palette[key].targets;

    for (let i = 0; i < targets.length; i++) {
      if (targets[i].element === element && targets[i].attribute === attribute) {
        targets.splice(i, 1);
        i--;
      }
    }
  })

  palette[$('#groupSelector').val()].targets.push({
    element: element,
    attribute: attribute
  })

  console.log(palette);

  applyPalette();
})

// apply a color to a palette group
$('#apply').click(function() {
  palette[$('#pickGroup').val()].color = $('#selectedColor').val();
  applyPalette();
})

// change selected element when parent selector is changed
$('#elementSelector').on('change', function () {
  setSelected(elementOptions[$('#elementSelector').val()])
})
