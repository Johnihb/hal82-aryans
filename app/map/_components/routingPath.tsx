import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useMap } from 'react-leaflet'
import useUserStore from '@/store/userStore'
import routingMachineStyle from '../_lib/routingMachineStyle'

const RoutingPath = () => {
  const map: L.Map  = useMap()
  const userPosition = useUserStore(state => state.userLocation)
  const RoutingMachineRef = useRef<L.Routing.Control | null>(null)
  const userModeOfTransport = useUserStore(state => state.userModeOfTransport)
  const userDestination = useUserStore(state => state.userDestination)
  const containerRef = useRef<HTMLElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(true)
  const isExpandedRef = useRef(true) // persistent source of truth across effect re-runs
  const touchStartYRef = useRef(0)
  const touchStartTimeRef = useRef(0)
  const mapPaddingAppliedRef = useRef(false)
  
  useEffect(() => {
    if (!map || !userPosition || !userDestination || userDestination[0] == null || userDestination[1] == null) return

    // Clean up existing routing control
    if (RoutingMachineRef.current) {
      try {
        map.removeControl(RoutingMachineRef.current)
      } catch (error) {
        console.error('Error removing control:', error)
      }
      RoutingMachineRef.current = null
    }

    // Create routing control
    RoutingMachineRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userPosition),
        L.latLng([userDestination[0], userDestination[1]]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
      draggableWaypoints: false,
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { 
            color: '#94a3b8',
            opacity: 0.4, 
            weight: 5,
          }
        ]
      } as L.Routing.LineOptions,
      lineOptions: {
        styles: [
          { 
            color: '#6366f1',
            opacity: 0.9, 
            weight: 6,
          }
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      } as L.Routing.LineOptions,
      
      router: L.Routing.osrmv1({
        serviceUrl: process.env.NEXT_PUBLIC_OSRM_SERVICE_URL || 'https://router.project-osrm.org/route/v1',
        profile: process.env.NEXT_PUBLIC_OSRM_SERVICE_URL ? userModeOfTransport : 'driving',
      }),
      
      collapsible: false,
      containerClassName: 'route-panel'
    }).addTo(map)

    // Inject styles
    injectStyles()

    // Apply map padding on mobile to prevent markers from being hidden
    const applyMapPadding = () => {
      if (window.innerWidth <= 768 && !mapPaddingAppliedRef.current) {
        const panelHeight = window.innerHeight * 0.6
        map.fitBounds(map.getBounds(), {
          paddingBottomRight: [0, panelHeight + 20],
          paddingTopLeft: [0, 80],
          animate: true,
          duration: 0.5
        })
        mapPaddingAppliedRef.current = true
      }
    }

    // Wait for DOM
    setTimeout(() => {
      const container = document.querySelector('.route-panel') as HTMLElement
      if (!container) return
      
      containerRef.current = container

      // ✅ Reapply collapsed state immediately before any UI is built
      if (!isExpandedRef.current) {
        container.classList.add('collapsed')
      }

      // Create custom UI
      const header = document.createElement('div')
      header.className = 'route-header'
      header.innerHTML = `
        <div class="route-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="mb-4">Route Details</span>
        </div>
        <button class="route-toggle" aria-label="${isExpandedRef.current ? 'Minimize panel' : 'Expand panel'}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            ${isExpandedRef.current
              ? '<path d="M19 12H5M12 19l-7-7 7-7"></path>'
              : '<circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor" transform="translate(-6 0)"/><circle cx="12" cy="12" r="1" fill="currentColor" transform="translate(6 0)"/>'
            }
          </svg>
        </button>
      `
      
      const contentWrapper = document.createElement('div')
      contentWrapper.className = 'route-content'
      
      // Move all existing content
      while (container.firstChild) {
        contentWrapper.appendChild(container.firstChild)
      }
      
      container.appendChild(header)
      container.appendChild(contentWrapper)

      // Apply map padding after panel is rendered (mobile only)
      // Only apply if panel is expanded
      if (window.innerWidth <= 768 && isExpandedRef.current) {
        setTimeout(() => {
          applyMapPadding()
        }, 200)
      }

      const toggleBtn = header.querySelector('.route-toggle') as HTMLElement
      
      const togglePanel = (e?: Event) => {
        if (e) {
          e.stopPropagation()
        }
        
        const isCurrentlyCollapsed = container.classList.contains('collapsed')
        
        if (isCurrentlyCollapsed) {
          // Expand
          container.classList.remove('collapsed')
          isExpandedRef.current = true // ✅ update ref
          setIsExpanded(true)
          
          if (window.innerWidth <= 768) {
            setTimeout(() => {
              const panelHeight = window.innerHeight * 0.6
              map.fitBounds(map.getBounds(), {
                paddingBottomRight: [0, panelHeight + 20],
                paddingTopLeft: [0, 80],
                animate: true,
                duration: 0.3
              })
            }, 100)
          }
          
          if (toggleBtn) {
            const icon = toggleBtn.querySelector('svg')
            if (icon) {
              icon.innerHTML = '<path d="M19 12H5M12 19l-7-7 7-7"></path>'
              toggleBtn.setAttribute('aria-label', 'Minimize panel')
            }
          }
        } else {
          // Collapse
          container.classList.add('collapsed')
          isExpandedRef.current = false // ✅ update ref
          setIsExpanded(false)
          
          if (window.innerWidth <= 768) {
            mapPaddingAppliedRef.current = false // ✅ reset so padding can be reapplied on expand
            map.fitBounds(map.getBounds(), {
              paddingBottomRight: [0, 80],
              paddingTopLeft: [0, 80],
              animate: true,
              duration: 0.3
            })
          }
          
          if (toggleBtn) {
            const icon = toggleBtn.querySelector('svg')
            if (icon) {
              icon.innerHTML = '<circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor" transform="translate(-6 0)"/><circle cx="12" cy="12" r="1" fill="currentColor" transform="translate(6 0)"/>'
              toggleBtn.setAttribute('aria-label', 'Expand panel')
            }
          }
        }
      }
      
      toggleBtn?.addEventListener('click', togglePanel)
      
      const handleContainerClick = (e: MouseEvent) => {
        if (window.innerWidth > 768 && container.classList.contains('collapsed')) {
          togglePanel(e)
        }
      }
      container.addEventListener('click', handleContainerClick)

      // Mobile swipe
      if (window.innerWidth <= 768) {
        header.addEventListener('touchstart', (e) => {
          touchStartYRef.current = e.touches[0].clientY
          touchStartTimeRef.current = Date.now()
          header.style.cursor = 'grabbing'
        }, { passive: true })

        header.addEventListener('touchmove', (e) => {
          const deltaY = e.touches[0].clientY - touchStartYRef.current
          if (Math.abs(deltaY) > 10) {
            e.preventDefault()
          }
        }, { passive: false })

        header.addEventListener('touchend', (e) => {
          const deltaY = e.changedTouches[0].clientY - touchStartYRef.current
          const deltaTime = Date.now() - touchStartTimeRef.current
          const velocity = Math.abs(deltaY) / deltaTime
          
          header.style.cursor = 'grab'
          
          // Swipe down to collapse
          if (deltaY > 60 || (deltaY > 30 && velocity > 0.5)) {
            if (!container.classList.contains('collapsed')) {
              container.classList.add('collapsed')
              isExpandedRef.current = false // ✅ update ref
              setIsExpanded(false)
              mapPaddingAppliedRef.current = false // ✅ reset padding flag
              
              map.fitBounds(map.getBounds(), {
                paddingBottomRight: [0, 80],
                paddingTopLeft: [0, 80],
                animate: true,
                duration: 0.3
              })
            }
          }
          // Swipe up to expand
          else if (deltaY < -60 || (deltaY < -30 && velocity > 0.5)) {
            if (container.classList.contains('collapsed')) {
              container.classList.remove('collapsed')
              isExpandedRef.current = true // ✅ update ref
              setIsExpanded(true)
              
              const panelHeight = window.innerHeight * 0.6
              map.fitBounds(map.getBounds(), {
                paddingBottomRight: [0, panelHeight + 20],
                paddingTopLeft: [0, 80],
                animate: true,
                duration: 0.3
              })
            }
          }
        }, { passive: true })
      }

      // Clean up duplicate route names
      setTimeout(() => {
        const altElements = container.querySelectorAll('.leaflet-routing-alt')
        altElements.forEach((alt) => {
          const spans = alt.querySelectorAll('span')
          if (spans.length > 1) {
            for (let i = 1; i < spans.length; i++) {
              spans[i].remove()
            }
          }
        })
      }, 100)

    }, 150)

    return () => {
      if (RoutingMachineRef.current && map) {
        try {
          map.removeControl(RoutingMachineRef.current)
        } catch (error) {
          console.error('Cleanup error:', error)
        }
        RoutingMachineRef.current = null
      }
      
      // Reset map padding on cleanup
      if (mapPaddingAppliedRef.current) {
        map.fitBounds(map.getBounds(), {
          padding: [0, 0],
          animate: false
        })
        mapPaddingAppliedRef.current = false
      }
      
      containerRef.current = null
    }
  }, [map, userPosition, userDestination, userModeOfTransport])

  return null
}

const injectStyles = () => {
  if (document.getElementById('route-panel-styles')) return
  
  const style = document.createElement('style')
  style.id = 'route-panel-styles'
  style.textContent = routingMachineStyle
  document.head.appendChild(style)
}

export default RoutingPath