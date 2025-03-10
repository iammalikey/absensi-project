self.addEventListener("install", (event) => {
    console.log("Service Worker: Installed");

    event.waitUntil(
        caches.open("app-cache").then((cache) => {
            return cache.addAll([
                "/",
                "./resources/css/app.css",
                "./resources/app.jsx"
            ]).catch((error) => {
                console.error("Cache addAll failed:", error);
            });
        })
    );
});
