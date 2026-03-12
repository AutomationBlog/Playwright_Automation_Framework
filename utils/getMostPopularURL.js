/*
For this question, you are given a log file from a simple web server. Each line in the log file contains a URL and nothing else. Your job is to write code that will fetch/download the log file from the internet, process it, and output the most popular URL in the file. You do not need to normalize the URLs in the log files.

Use the following sample log files:

logfilel logfile2= "https://public.karat.io/content/single_url.txt" -> the result is https://www.acme.inc/ (1 occurrence) 

"https://public.karat.io/content/urls2.txt" -> the most common URL is http://www.example.com (with 1170 occurrences)

For example, if the log file contains the following lines:

http://www.example.com/living

http://www.example.com/2014/07/08/worldsport/gallery/what-a-shot-0708/index.html

http://www.example.com/2014/07/04/health/mosquito-bites-myths/index.html

http://www.example.com/living

https://www.example.com/living

http://www.example.com/trends

http://www.example.com/profile

The expected output is "http://www.example.com/living (2 occurences)" 
*/

async function getMostPopularURL(logFileURL) {
  // Step 1: Fetch the log file
  const response = await fetch(logFileURL);
  const text = await response.text();

  // Step 2: Parse into clean lines
  const urls = text.split("\n").filter(Boolean);

  // Step 3: Build frequency map
  const counts = {};
  for (const url of urls) {
    counts[url] = (counts[url] || 0) + 1;
  }

  console.log(counts);

  // Step 4: Find the URL with the highest count
  let mostPopularURL = null;
  let maxCount = 0;

  for (const [url, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      mostPopularURL = url;
    }
  }

  // Step 5: Output
  console.log(`${mostPopularURL} (${maxCount} occurrences)`);
}

// Test with both log files
getMostPopularURL("https://public.karat.io/content/single_url.txt");
// getMostPopularURL("https://public.karat.io/content/urls2.txt");
