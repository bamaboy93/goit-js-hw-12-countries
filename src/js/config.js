import fetchCountries from './fetchCountries'
import error from './error'
import refs from './refs'
import listcountriesTpl from '../templates/listcountries.hbs';
import countryTpl from '../templates/country.hbs'

const debounce = require('lodash.debounce');

const onSearch = debounce ((evt) => {
    const searchQuery = evt.target.value;
    
    clearMarkup();
    
    fetchCountries(searchQuery).then(countries => {
      if (countries.length >= 10) {
        
        return error(message);
      }
    
        if (countries.length >= 2 && countries.length <= 10) {
            countriesListMarkup(countries);

        } 


      if (countries.length === 1) {
        fetchCountryMarkup(countries);
      }
    }, console.log)
    .catch(err => error(err));
}, 500)


function fetchCountryMarkup(data) { 
  refs.countryContainer.classList.add('countries');
  refs.countryContainer.innerHTML = countryTpl(data);

}
function countriesListMarkup(data) { 
  const markup = listcountriesTpl(data);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}
function clearMarkup() { 
  refs.countriesList.innerHTML = " ";
  refs.countryContainer.classList.remove('countries');
  refs.countryContainer.innerHTML = " ";
}



const message = 'Too many matches found. Please enter a more specific query!';

refs.searchInput.addEventListener('input', onSearch);