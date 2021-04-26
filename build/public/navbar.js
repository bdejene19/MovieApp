function nav() {
    const navContent = `<navBar class="nav">
    <button class="openbtn" onclick="openNav()">☰ Open Sidebar</button>  
    <h2 id="title">Hi {{name}}! What do you want to watch today?</h2>

</navBar> 

    <div id="mySidebar" class="sidebar" >
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <a href="./accounts" id='account'>Account</a>
        <a href="./movies">Movies</a>
        <a href="./tvShows">TV Shows</a>
        <a href="./genres">Genres</a>
    </div>
    
    <div id="main">
    </div>`;

    document.getElementById('nav-container').innerHTML = navContent;
}
