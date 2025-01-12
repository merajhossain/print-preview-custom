function printContent() {
    // Get user-selected values
    const pageSize = document.getElementById("page-size").value;
    const layout = document.getElementById("layout").value;
    const pagesPerSheet = document.getElementById("pages-per-sheet").value;
    const margins = document.getElementById("margins").value;
    const colorMode = document.getElementById("color-mode").value;
    const scale = document.getElementById("scale").value;
  
    // Dynamically update @page style
    const printStyle = document.createElement("style");
    printStyle.innerHTML = `
      @page {
        size: ${pageSize} ${layout};
        margin: ${getMarginSize(margins)};
      }
    `;
    document.head.appendChild(printStyle);
  
    // Apply scaling (zoom in/out)
    const printContent = document.getElementById("print-content");
    printContent.style.transform = `scale(${scale / 100})`;
  
    // Apply color mode
    if (colorMode === "black-and-white") {
      printContent.classList.add("black-and-white");
    } else {
      printContent.classList.remove("black-and-white");
    }
  
    // Show pages-per-sheet warning
    if (pagesPerSheet !== "1") {
      alert(
        `Pages per sheet (${pagesPerSheet}) is not natively supported by browsers. Please adjust this setting manually in the print dialog.`
      );
    }
  
    // Trigger print
    window.print();
  
    // Clean up
    document.head.removeChild(printStyle);
    printContent.style.transform = ""; // Reset scaling
  }
  
  function getMarginSize(margins) {
    switch (margins) {
      case "narrow":
        return "5mm";
      case "none":
        return "0mm";
      default:
        return "20mm";
    }
  }
  