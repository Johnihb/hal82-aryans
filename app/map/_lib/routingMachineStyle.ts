const routingMachineStyle =  `
    /* Base panel - Desktop */
    .route-panel {
      position: fixed !important;
      top: 20px !important;
      left: 20px !important;
      width: 360px;
      max-height: calc(100vh - 40px);
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999 !important;
      display: flex;
      flex-direction: column;
    }

    /* Collapsed state - Desktop (circle) */
    .route-panel.collapsed {
      width: 56px !important;
      height: 56px !important;
      border-radius: 50% !important;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .route-panel.collapsed:hover {
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: scale(1.05);
    }

    .route-panel.collapsed .route-content {
      display: none;
      opacity: 0;
      pointer-events: none;
    }

    .route-panel.collapsed .route-title span {
      display: none;
      opacity: 0;
    }

    .route-panel.collapsed .route-title svg {
      transform: scale(1.1);
    }

    .route-panel.collapsed .route-header {
      padding: 18px;
      justify-content: center;
    }

    /* Header */
    .route-header {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
      min-height: 56px;
      transition: all 0.3s ease;
    }

    .route-title {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      font-size: 16px;
      font-weight: 600;
      flex: 1;
      transition: all 0.3s ease;
    }

    .route-title svg {
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .route-title span {
      transition: opacity 0.2s ease, display 0.2s ease;
    }

    .route-toggle {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .route-toggle:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }

    .route-toggle:active {
      transform: scale(0.95);
    }

    .route-panel.collapsed .route-toggle {
      display: none;
    }

    /* Content area */
    .route-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      transition: opacity 0.3s ease;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    /* Hide default headers */
    .leaflet-routing-container h2,
    .leaflet-routing-container h3,
    .leaflet-routing-collapse-btn,
    .leaflet-routing-geocoders {
      display: none !important;
    }

    /* Route alternatives - Compact */
    .leaflet-routing-alt {
      padding: 12px 18px !important;
      border-bottom: 1px solid #f1f5f9 !important;
      background: white !important;
      cursor: pointer !important;
      transition: background 0.15s ease !important;
      display: flex;
      align-items: center;
      min-height: 48px;
      flex-shrink: 0;
    }

    .leaflet-routing-alt:hover {
      background: #f8fafc !important;
    }

    .leaflet-routing-alt:last-of-type {
      border-bottom: 2px solid #e2e8f0 !important;
    }

    .leaflet-routing-alt span {
      font-size: 14px !important;
      color: #1e293b !important;
      font-weight: 600 !important;
      line-height: 1.4 !important;
    }

    .leaflet-routing-alt-first {
      background: #fef3f2 !important;
    }

    .leaflet-routing-alt-first:hover {
      background: #fee5e3 !important;
    }

    /* Instructions - Compact */
    .leaflet-routing-container table {
      width: 100%;
      border-collapse: collapse;
    }

    .leaflet-routing-container tbody {
      display: block;
    }

    .leaflet-routing-container tbody tr {
      display: flex;
      flex-direction: column;
      padding: 10px 18px;
      border-bottom: 1px solid #f8fafc;
      transition: background 0.1s ease;
    }

    .leaflet-routing-container tbody tr:hover {
      background: #fafbfc;
    }

    .leaflet-routing-container tbody tr:last-child {
      border-bottom: none;
    }

    .leaflet-routing-container td {
      padding: 0 !important;
      border: none !important;
    }

    .leaflet-routing-container td:first-child {
      margin-bottom: 4px;
      opacity: 0.7;
    }

    .leaflet-routing-container td:nth-child(2) {
      font-size: 13px !important;
      color: #334155 !important;
      line-height: 1.4 !important;
      margin-bottom: 3px;
    }

    .leaflet-routing-container td:nth-child(3) {
      font-size: 12px !important;
      color: #64748b !important;
    }

    /* Scrollbar */
    .route-content::-webkit-scrollbar {
      width: 5px;
    }

    .route-content::-webkit-scrollbar-track {
      background: #f8fafc;
    }

    .route-content::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    .route-content::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* Mobile & Tablet - MAX 60% height */
    @media (max-width: 768px) {
      /* Ensure map markers are visible above panel */
      .leaflet-marker-pane {
        z-index: 600 !important;
      }
      
      .leaflet-popup-pane {
        z-index: 700 !important;
      }
      
      .route-panel {
        position: fixed !important;
        top: auto !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        max-height: 60vh !important;
        height: auto;
        border-radius: 24px 24px 0 0 !important;
        box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15) !important;
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 800 !important;
      }

      .route-panel.collapsed {
        transform: translateY(calc(100% - 64px)) !important;
        width: 100% !important;
        height: auto !important;
        max-height: 64px !important;
        border-radius: 24px 24px 0 0 !important;
        box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.1) !important;
      }

      .route-panel.collapsed:hover {
        transform: translateY(calc(100% - 64px)) !important;
      }

      .route-panel.collapsed .route-content {
        display: none;
      }

      .route-panel.collapsed .route-title span {
        display: inline;
        opacity: 1;
      }

      .route-panel.collapsed .route-header {
        padding: 20px 18px 16px;
        justify-content: flex-start;
      }

      .route-header {
        cursor: grab;
        padding: 20px 18px 14px;
        position: relative;
        min-height: 64px;
      }

      .route-header:active {
        cursor: grabbing;
      }

      /* Drag indicator */
      .route-header::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 4px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 2px;
      }

      .route-toggle {
        display: none !important;
      }

      /* Compact alternatives on mobile */
      .leaflet-routing-alt {
        padding: 14px 18px !important;
        min-height: 56px;
      }

      .leaflet-routing-alt:active {
        background: #f1f5f9 !important;
      }

      .leaflet-routing-alt span {
        font-size: 14px !important;
      }

      /* Compact instructions */
      .leaflet-routing-container tbody tr {
        padding: 12px 18px;
      }

      .leaflet-routing-container td:nth-child(2) {
        font-size: 14px !important;
      }

      .leaflet-routing-container td:nth-child(3) {
        font-size: 13px !important;
      }

      /* Remove unused space */
      .route-content {
        padding-bottom: max(env(safe-area-inset-bottom), 12px);
        flex-shrink: 0;
      }

      /* Ensure content wrapper doesn't create extra space */
      .leaflet-routing-container > div:last-child {
        min-height: auto !important;
        padding-bottom: 0 !important;
      }
    }

    /* Small mobile - even more compact */
    @media (max-width: 480px) {
      .route-panel {
        max-height: 60vh !important;
      }

      .route-panel.collapsed {
        transform: translateY(calc(100% - 60px)) !important;
        max-height: 60px !important;
      }

      .route-header {
        padding: 18px 16px 12px;
        min-height: 60px;
      }

      .route-panel.collapsed .route-header {
        padding: 18px 16px;
      }

      .route-title {
        font-size: 15px;
      }

      .leaflet-routing-alt {
        padding: 12px 16px !important;
        min-height: 52px;
      }

      .leaflet-routing-alt span {
        font-size: 13px !important;
      }

      .leaflet-routing-container tbody tr {
        padding: 10px 16px;
      }

      .leaflet-routing-container td:nth-child(2) {
        font-size: 13px !important;
      }

      .leaflet-routing-container td:nth-child(3) {
        font-size: 12px !important;
      }
    }

    /* Smooth text rendering */
    .route-panel * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `
export default routingMachineStyle;