// Import necessary modules
import fs from 'fs';
import EmailValidator from 'email-validator';

// Define the structure of the analysis result
/*  
In TypeScript, an interface is a way to define a contract or a 
structure for objects. 
It allows you to specify the shape that an object should have in
 terms of properties and their types.
*/

interface AnalysisResult {
  validDomains: string[];
  totalEmailsParsed: number;
  totalValidEmails: number;

  domainOccurrences: Record<string, number>;
  /*
  e.g
    { 
      'gmail.com' : 1,
      'decagon.com.ng' : 2,
    }

  Record<string, number> is a TypeScript utility type.
   It defines an object type with string keys and number values. 
  In this specific case, it's used to indicate that 
  domainOccurrences is expected to be an object where the keys are strings 
  (domain names) and the values are numbers (occurrence counts).

  */
}

// Function to analyze input files and save the result to a JSON file
function analyseFiles(inputPaths: string[], outputPath: string) {
  // Initialize arrays and objects to store email-related data
  const allEmails: string[] = [];
  const validEmails: string[] = [];
  const validDomains: string[] = [];
  const domainOccurrences: Record<string, number> = {};

  // Iterate over each input file path
  inputPaths.forEach((filePath) => {

    // Read the content of the file
    const fileData = fs.readFileSync(filePath, 'utf-8');
    /* readFileSync is a synchronous method that reads the contents 
    of the specified file (filePath) and returns it as a string.*/


    // Split the file content into lines and extract emails (assuming CSV format with a header)
    const emails = fileData.split('\n').slice(1, -1);

    /*  
    
    This method splits the contents of the file into 
    an array of strings using the newline ('\n') character as 
    the delimiter. This assumes each line in the file represents a separate piece of data.
    
    */

    /*  
        This method extracts a subset of the array. In this case, it starts from the second element (index 1) and goes up to, 
        but does not include, the last element (index -1). 
        This is done to skip 
        the header assuming that the CSV file has a header and the email
         data starts from the second line.
    
    */


    // Collect all emails from the file
    allEmails.push(...emails);

    /* 
    
        This line is using the push method to add elements to the allEmails array. 
        The ...emails is using the spread syntax, 
        which "spreads" the elements of the emails array into individual elements.
    */

    /* 
        For example, if emails is ['email1@example.com', 
        'email2@example.com'], then ...emails would become 'email1@example.com', 'email2@example.com'.
    */



    // Iterate over each email in the file
    emails.forEach((email) => {
      // Check if the email is valid using the EmailValidator module
      if (EmailValidator.validate(email)) {
        // If valid, add to the list of valid emails
        validEmails.push(email);

        // Extract the domain from the email and add it to the list of valid domains
        const [, domain] = email.split('@');

        /*          
        email.split('@'):

        The split('@') method is called on the email string, 
        and it splits the string into an array of substrings 
        using the '@' character as the delimiter.
        For example, if email is 'user@example.com', 
        then email.split('@') would result in ['user', 'example.com'].
        */


        /*
        
        [, domain]: Destructuring Assignment:

        This syntax is using destructuring assignment to capture 
        the second element of the array (the domain part) and assign it
        to the variable domain.

        The comma before domain indicates that we're 
        skipping the first element of the array. 
        The first element, represented by the empty square brackets [,], is ignored and not assigned to any variable.

        So, in the example of 'user@example.com', 
        after this line is executed, 
        domain would be assigned the value 'example.com'
        */

        validDomains.push(domain);
        // Update the count of occurrences for the domain

        domainOccurrences[domain] = (domainOccurrences[domain] || 0) + 1;
        /* 
            domainOccurrences[domain]:

        This part accesses the value associated with the domain key in the domainOccurrences object.
        For example, if domain is 'example.com', this expression would retrieve the current count of occurrences for the domain 'example.com'.
        (domainOccurrences[domain] || 0):

        This part uses the logical OR (||) operator to provide a default value of 0 if the count for the current domain is undefined or null.
        If domain is not present in domainOccurrences (i.e., it's the first occurrence of this domain), this part ensures that the default value is 0.
        + 1:

        This part increments the count by 1.
        After retrieving the existing count or using the default value, 1 is added to it.
        domainOccurrences[domain] = ...:

        This part assigns the updated count back to the domainOccurrences object for the specified domain.
        It effectively updates the count of occurrences for the given domain in the domainOccurrences object.
                
        */

      }
    });
  });

  // Get unique valid domains
  const uniqueValidDomains = Array.from(new Set(validDomains));

  // Create the final result object
  const result: AnalysisResult = {
    validDomains: uniqueValidDomains,
    totalEmailsParsed: allEmails.length,
    totalValidEmails: validEmails.length,
    domainOccurrences,
  };

  // Write the result to a JSON file
  fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8', (err) => {


    /*  
    
        The parameters passed to writeFile are as follows:
        outputPath: The path to the file where the data will be written.
        JSON.stringify(result, null, 2): The data to be written.
        Here, result is an object, and JSON.stringify converts it to a JSON-formatted string. 
        The null, 2 parameters are for indentation, making the JSON output more readable by adding two spaces for each level.
        'utf-8': The encoding of the file. In this case, it's UTF-8.
        The fourth parameter is a callback function (err) => { ... }, 
        which will be called once the write operation is complete. If there is an error during the write operation, err will contain information about the error.
            
    */


        /* 
        
            result:

                This is the object that you want to convert into a JSON string. 
                In the context of your code, result is the object containing the analysis results.
                null:

                The second parameter is a replacer function, which is optional. 
                If you don't need to modify the transformation of the object, you can pass null or omit this parameter.
                2:

                The third parameter is the number of spaces to use for indentation in the resulting JSON string. 
                In this case, 2 spaces are used for each level of indentation, making the JSON string more readable.
                        */
    if (err) {
      console.error(err);
    } else {
      console.log(result); // Outputs the result to the console.
      console.log('Result saved to', outputPath);
    }
  });
}

// Export the analyseFiles function as the default export of the module
export default analyseFiles;
