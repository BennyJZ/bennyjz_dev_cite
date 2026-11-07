// Return cleanup so callers can remove the listener when they unmount.
export default function watchResize(onResize) {
    function handleResize() {
        onResize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}
