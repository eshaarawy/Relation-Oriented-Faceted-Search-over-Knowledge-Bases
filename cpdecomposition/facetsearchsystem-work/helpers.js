function generateQuery(focus, facets){
    /* Keyword search against Subject */
    const queryKeywordForSubject = 'SELECT spo.subject, spo.property, spo.object FROM (SELECT subject, property, object, pagerank FROM triple INNER JOIN (SELECT resource, pagerank FROM entity WHERE document ILIKE $1) AS e ON subject = e.resource) AS spo';
    /* Keyword search for Object */
    const queryKeywordForObject = 'SELECT spo.subject, spo.property, spo.object FROM (SELECT subject, property, object, pagerank FROM triple INNER JOIN (SELECT resource, pagerank FROM entity WHERE document ILIKE $1) AS e ON object = e.resource) AS spo';
  
    /* Extraction of entity facets */
    // const selectEntityFacet = 'SELECT resource FROM fcttype WHERE type = '; 
    /* Property facet extraction */
    const selectPropertyFacet = 'SELECT resource FROM fctproperty WHERE type = '; 
  
    /* Join conditions for facets and search results */
    // const joinBySubject = 'as sfct ON spo.subject = sfct.resource ';
    const joinByProperty = 'as pfct ON spo.property = pfct.resource ';
    // const joinByObject = 'as ofct ON spo.object = ofct.resource ';
  
    /* OrderBy clause */
    const orderBy = 'ORDER BY spo.pagerank DESC';
  
    if(focus == 'Subject'){ // Difference by branching: queryKeywordForSubject or queryKeywordForObject
        if((facets[1] === undefined) || (facets[1] == "-")){ //ファセットの選択がない場合(単純なキーワード検索)
            return queryKeywordForSubject + " " + orderBy;
        }else if(facets[1] != "-"){ //Select property type only
            return queryKeywordForSubject + " INNER JOIN (" + selectPropertyFacet +"$2)" + joinByProperty + " " + orderBy;
        }
    }else{ // Difference by branching: queryKeywordForSubject or queryKeywordForObject
        if((facets[1] === undefined) || (facets[1] == "-")){ //ファセットの選択がない場合(単純なキーワード検索)
          return queryKeywordForSubject + " " + orderBy;
      }else if(facets[1] != "-"){ //Select property type only
          return queryKeywordForObject + " INNER JOIN (" + selectPropertyFacet +"$2)" + joinByProperty + " " + orderBy;
      }
    }
  }
  
  
  
  
  /***** function to generate queries for facet generation *****/
  function generateFacet(results, spo){ // The first argument gives the results of the search, for which of the SPOs the facets should be generated.
    const propertyFacet = 'SELECT type, count(distinct resource) AS cnt FROM fctproperty ';
    // const entityFacet = 'SELECT type, count(distinct resource) AS cnt FROM fcttype ';
    const where = 'WHERE resource IN';
    const groupBy = 'GROUP BY type ORDER BY cnt DESC';
  
    var uniquespo = deleteDuplicate(results, spo);
    var placeholders = [];
  
    for(let i = 1; i < uniquespo.length+1; i++){ //Generate as many placeholders as there are unique spo's to condition the where clause.
        var placeholder = '$' + i ;
        placeholders.push(placeholder);
    }
  
    var condition = placeholders.join(',');
  
    if(spo == 'subject' || spo == 'object'){
        return propertyFacet + where + ' (' + condition + ') ' + groupBy;
    }else{
        return propertyFacet + where + ' (' + condition + ') ' + groupBy;
    }
  }
  
  
  
  /***** function to get duplicate-free subject, property and object from search results *****/
  function deleteDuplicate(results, spo){ // first argument gives the results, spo is the string of the element of the triple (subject,property,object) that you want to eliminate duplicates from.
    var unique = {};
    
    for(row in results.rows){
      var uri = results.rows[row][spo];
      if(unique[uri]){
        unique[uri] += 1;
      }else{
        unique[uri] = 1;
      }
    }
    var uniquespo = Object.keys(unique);
    return uniquespo;
  }
  
  
  
  /***** function to create variables for search *****/
  function generateVariable(keyword,facets){
    if((facets[1] === undefined) || (facets[1] == "-")){
      return ['%' + keyword + '%'];
    }else if(facets[1] != "-"){ //Select only the Property type
      return ['%' + keyword + '%', facets[1]];
    }
  }
  
  /***** get request date and time measure *****/
  function time(){
    var now = new Date();
    return now.toLocaleString();
  }

  module.exports = {
    generateQuery,
    generateFacet,
    deleteDuplicate,
    generateVariable,
    time
  };