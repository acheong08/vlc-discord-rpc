/**
 * Searches for a TV show by name using the TVmaze API.
 * @param {string} showName - The name of the show to search for.
 * @returns {object | null} An object containing the name of the show and its image URL if found, or null if not found or an error occurs.
 */
async function searchShow(showName) {
  try {
    // Use the TVmaze API to search for the show by name
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${showName}`);
    const data = await response.json();

    // Make sure we actually found a show
    if (data && data.length > 0) {
      // Get the first result (most relevant)
      const [{show}] = data;

      // Use the TVmaze API to get the show's image URL
      const imageResponse = await fetch(`http://api.tvmaze.com/shows/${show.id}/images`);
      const imageData = await imageResponse.json();
      if(imageData && imageData.length > 0) {

        // Get the first image (most common)
        const image = imageData[0].resolutions.original.url;

        return {
          name: show.name,
          image
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Searches for a TV show by name using the TVmaze API.
 * @param {string} showName - The name of the show to search for.
 * @returns {object | null} An object containing the name of the show and its image URL if found, or null if not found or an error occurs.
 */
async function searchShowMultipleResults(showName) {
  try {
    // Use the TVmaze API to search for the show by name
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${showName}`);
    const data = await response.json();

    // Make sure we actually found a show
    if (data && data.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { searchShow, searchShowMultipleResults };
