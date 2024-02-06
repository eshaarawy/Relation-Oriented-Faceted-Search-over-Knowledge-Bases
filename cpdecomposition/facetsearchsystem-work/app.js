const express = require('express');
const app = express();
const db = require("./dbconnection");
const { generateQuery, generateFacet, deleteDuplicate, generateVariable, time } = require('./helpers');


db.connect();
// db.on('error', function (err, client) {
//     console.error('idle client error', err.message, err.stack);
// });
// db.query('SELECT * FROM triple LIMIT 50', function(err, res) {
//     if(err) {
//         return console.error('error running query', err);
//     }
//     console.log('number:', res.rows[0]);
// });
  

// Set the 'public' directory as the location for static files
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    var keyword = req.query.Keyword; // Always obtained as it is controlled by input
    var focus = req.query.Focus; // Always obtained as it is controlled by input
    var facets = [req.query.SubjectFacets,req.query.PropertyFacets,req.query.ObjectFacets]; //Inputs may not be available.
    var query = generateQuery(focus,facets);
    console.log("Query: ", query);
    
    /* Search process */
    if(focus != undefined){
        db.query(query, generateVariable(keyword,facets), function(err1, results){  // Return keyword search results
        if(results.rowCount == 0){ // Indicate that there were zero search results and avoid errors
            res.render('index', {
            keyword: keyword,
            focus: focus, 
            subjecttype: facets[0],
            predicatetype: facets[1],
            objecttype: facets[2],
            content: 'NO RESULTS',
            subjectfacet: null,
            propertyfacet: null,
            objectfacet: null
            });
            console.log('time:',time());
            console.log('rowCount:',results.rowCount);
            console.log('keyword:',keyword);
            console.log('focus:',focus);
            console.log('facets:',facets);
        }else{ // Only when there are search results and facet generation queries according to the search results
            // db.query(generateFacet(results,'subject'), deleteDuplicate(results,'subject'), function(err2, subjectfacets){   //Return property facets corresponding to keyword search results.
             db.query(generateFacet(results,'property'), deleteDuplicate(results,'property'), function(err3, propertyfacets){   // Returns subject facets corresponding to keyword search results
                // db.query(generateFacet(results,'object'), deleteDuplicate(results,'object'), function(err4, objectfacets){   // Returns object facets corresponding to keyword search results
                if(err1 || err3){ //For debugging
                    console.log('time:',time());
                    console.log('results:',results);
                    console.log('subjectfacets:',subjectfacets);
                    console.log('propertyfacets:',propertyfacets);
                    console.log('objectfacets:',objectfacets);
                    // console.log('err1:', err1);
                    console.log('err2:', err2);
                    console.log('err3:', err3);
                    // console.log('err4:', err4);
                }else{ // If the process is completed successfully.
                    var data = {keyword:keyword, focus:focus, subjecttype:facets[0], predicatetype:facets[1] , objecttype:facets[2], content:results.rows.slice(0,300), rowCount:results.rowCount, propertyfacet:propertyfacets.rows};
                    res.render('index', data);
                    console.log('time:',time());
                    console.log('rowCount:',results.rowCount);
                    console.log('keyword:',keyword);
                    console.log('focus:',focus);
                    console.log('facets:',facets);
                    console.log("Results: ", results.rows)
                }
                });
            // });
            // });
        }
        });
    }else{ // What is displayed when first accessed.
        res.render('index', {
            keyword: null,
            focus: null, 
            subjecttype: null,
            predicatetype: null,
            objecttype: null,
            content: null,
            propertyfacet: null,
            subjectfacet: null,
            objectfacet: null
        });
        console.log('time:',time());
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
