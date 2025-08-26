// Photo Posts Grid Population
document.addEventListener('DOMContentLoaded', function() {
    const photoPostsGrid = document.getElementById('photoPostsGrid');
    const featuredPost = document.querySelector('.featured-post');
    const postsListContent = document.querySelector('.posts-list-content');
    
    if (photoPostsGrid && featuredPost && postsListContent) {
        // Sample photo post data
        const photoPosts = [
            { id: 1, title: "Mountain Landscape", date: "Jan 15, 2024", image: "https://picsum.photos/400/250?random=10", description: "Breathtaking mountain views that capture the raw beauty of nature's majesty. Perfect for adventure seekers and nature lovers alike." },
            { id: 2, title: "City Night", date: "Jan 14, 2024", image: "https://picsum.photos/300/200?random=11", description: "Urban photography that showcases the vibrant energy of city life after dark." },
            { id: 3, title: "Ocean Waves", date: "Jan 13, 2024", image: "https://picsum.photos/300/200?random=12", description: "Capturing the powerful and serene moments of ocean waves crashing against the shore." },
            { id: 4, title: "Forest Path", date: "Jan 12, 2024", image: "https://picsum.photos/300/200?random=13", description: "Peaceful forest trails that invite you to explore the hidden wonders of woodland landscapes." },
            { id: 5, title: "Desert Sunset", date: "Jan 11, 2024", image: "https://picsum.photos/300/200?random=14", description: "Stunning desert landscapes painted with the warm colors of sunset." },
            { id: 6, title: "Urban Architecture", date: "Jan 10, 2024", image: "https://picsum.photos/300/200?random=15", description: "Modern architectural marvels that define contemporary urban design." },
            { id: 7, title: "Wildlife Portrait", date: "Jan 9, 2024", image: "https://picsum.photos/300/200?random=16", description: "Intimate wildlife photography that brings you face-to-face with nature's creatures." },
            { id: 8, title: "Flower Garden", date: "Jan 8, 2024", image: "https://picsum.photos/300/200?random=17", description: "Colorful botanical photography showcasing the delicate beauty of garden flowers." },
            { id: 9, title: "Beach Scene", date: "Jan 7, 2024", image: "https://picsum.photos/300/200?random=18", description: "Coastal photography that captures the tranquility and beauty of beach environments." },
            { id: 10, title: "Mountain Peak", date: "Jan 6, 2024", image: "https://picsum.photos/300/200?random=19", description: "Majestic mountain peaks reaching towards the sky, perfect for landscape photography." },
            { id: 11, title: "Street Art", date: "Jan 5, 2024", image: "https://picsum.photos/300/200?random=20", description: "Urban art and graffiti that transforms city walls into vibrant canvases." },
            { id: 12, title: "Nature Close-up", date: "Jan 4, 2024", image: "https://picsum.photos/300/200?random=21", description: "Macro photography revealing the intricate details of natural elements." }
        ];
        
        // Populate featured post (first item)
        populateFeaturedPost(photoPosts[0]);
        
        // Populate regular posts (items 1-5)
        populateRegularPosts(photoPosts.slice(1, 6));
        
        // Populate the photo grid (all items)
        photoPosts.forEach(post => {
            const photoPostItem = createPhotoPostItem(post);
            photoPostsGrid.appendChild(photoPostItem);
        });
    }
});

// Function to populate featured post
function populateFeaturedPost(post) {
    const featuredPost = document.querySelector('.featured-post');
    if (featuredPost) {
        const postImage = featuredPost.querySelector('.post-image img');
        const postTitle = featuredPost.querySelector('.post-title');
        const postDate = featuredPost.querySelector('.post-date');
        const postDescription = featuredPost.querySelector('.post-description');
        
        if (postImage) postImage.src = post.image;
        if (postImage) postImage.alt = post.title;
        if (postTitle) postTitle.textContent = post.title;
        if (postDate) postDate.textContent = post.date;
        if (postDescription) postDescription.textContent = post.description;
    }
}

// Function to populate regular posts
function populateRegularPosts(posts) {
    const postsListContent = document.querySelector('.posts-list-content');
    if (postsListContent) {
        // Clear existing posts
        postsListContent.innerHTML = '';
        
        // Add new posts
        posts.forEach(post => {
            const postElement = createRegularPost(post);
            postsListContent.appendChild(postElement);
        });
    }
}

// Function to create individual regular post items
function createRegularPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.setAttribute('data-post-id', post.id);
    
    postElement.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="post-content">
            <div class="post-header">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-date">${post.date}</span>
            </div>
            <p class="post-excerpt">${post.description}</p>
            <a href="#" class="read-more-btn"><span>Read More</span></a>
        </div>
    `;
    
    // Add click event for regular post items
    postElement.addEventListener('click', function() {
        console.log('Regular post clicked:', post.title);
        // Add your click functionality here
    });
    
    return postElement;
}

// Function to create individual photo post items
function createPhotoPostItem(post) {
    const photoPostItem = document.createElement('div');
    photoPostItem.className = 'photo-post-item';
    photoPostItem.setAttribute('data-post-id', post.id);
    
    photoPostItem.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="photo-post-overlay">
            <h4 class="photo-post-title">${post.title}</h4>
            <p class="photo-post-date">${post.date}</p>
        </div>
    `;
    
    // Add click event for photo post items
    photoPostItem.addEventListener('click', function() {
        console.log('Photo post clicked:', post.title);
        // Add your click functionality here (e.g., open modal, navigate to detail page)
    });
    
    return photoPostItem;
} 