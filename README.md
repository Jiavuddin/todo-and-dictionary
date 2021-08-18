In this practice let's fix the **Fetch And Routing** by applying the concepts we have learned till now.

### Refer to the image below:

<br/>
<div style="text-align: center;">
    <img src="https://assets.ccbp.in/frontend/content/react-js/fetch-and-routing-practice-output.gif" alt="fetch and routing output" style="max-width:70%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12)">
</div>
<br/>

### Project Set Up Instructions

<details>
<summary>Click to view the Set Up Instructions</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Project Completion Instructions

<details>
<summary>Click to view the Functionality to be added</summary>

#### Fix The Functionality

Fix the given code to have the following functionality

- In the `HomeRoute` blog list should be displayed by fetching data (HTTP GET
  request).
- Should navigate to the respective blog post when clicked on a blog in the blog
  list.
- In the `BlogItemRoute` blog item details should be displayed by fetching data
  (HTTP GET request).
- A _loader_ should be displayed while fetching blog list and blog item details.

</details>

#### Quick Tips

<details>
<summary>Click to view Quick Tips</summary>

- There are `18` bugs to be fixed to achieve the functionality and the UI that is expected.

</details>

> #### Important Note
>
> - Wrap the Loader component with an HTML container element and add the
>   `testid` attribute value as `loader` to it as shown below
>
> ```
> <div testid="loader">
>      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
> </div>
>
> ```

### Resources

#### Data Fetch URLs

- `https://apis.ccbp.in/blogs`
- `https://apis.ccbp.in/blogs/[id]`

    **Example:**

    ```js
    const apiUrl = `https://apis.ccbp.in/blogs/1`
    ```

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - Don't change the component folder names as those are the files being
>   imported into the tests.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a
>   look at the Cheat Sheets.
