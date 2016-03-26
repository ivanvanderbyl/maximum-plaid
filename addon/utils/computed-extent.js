import Ember from 'ember';
const { computed, expandProperties } = Ember;
import { extent } from 'd3-array';

function expandPropertyList(propertyList) {
  return propertyList.reduce((newPropertyList, property) => {
    const atEachIndex = property.indexOf('.@each');
    if (atEachIndex !== -1) {
      return newPropertyList.concat(property.slice(0, atEachIndex));
    } else if (property.slice(-2) === '[]') {
      return newPropertyList.concat(property.slice(0, -3));
    }

    expandProperties(property, (expandedProperties) => {
      newPropertyList = newPropertyList.concat(expandedProperties);
    });

    return newPropertyList;
  }, []);
}

function extractConstantValues(dependencies) {
  return dependencies.filter((property) => {
    return Ember.typeOf(property) !== 'string';
  });
}

function rejectConstantValues(dependencies) {
  return dependencies.filter((property) => {
    return Ember.typeOf(property) === 'string';
  });
}

export default function computedExtent(...dependencies) {
  const userSuppliedConstants = extractConstantValues(dependencies) || [];
  const expandedParams = expandPropertyList(rejectConstantValues(dependencies));

  const computedFn = computed.apply(this, [...rejectConstantValues(dependencies), {
    get() {
      let values = [];
      values = values.concat(userSuppliedConstants);

      let paramValues = expandedParams.map(p => this.get(p));
      paramValues.forEach((expandedProperty) => {
        if (Ember.typeOf(expandedProperty) === 'array') {
          values = values.concat(expandedProperty);
        }else{
          values.push(expandedProperty);
        }
      });

      return extent(values);
    }
  }]);

  return computedFn;
}
