import React, { useEffect, useRef, useState, useCallback } from "react"

import './styles.scss'
import testImage from '../images/test.png'
import frameImage from '../images/img10-f.png'

const FRAME_HEIGHT = 640
const FRAME_WIDTH = 480
const frameAspect = FRAME_HEIGHT / FRAME_WIDTH

const IndexPage = () => {
  const video = useRef()
  const canvas = useRef()

  const [shouldFacingUser, setShouldFacingUser] = useState(false)

  const takePhoto = useCallback(() => {
    video.current.pause()

    const videoStyle = window.getComputedStyle(video.current)
    const videoViewWidth = parseFloat(videoStyle.width)
    const videoViewHeight = parseFloat(videoStyle.height)

    const { videoWidth, videoHeight } = video.current

    const videoAspect = (videoHeight / videoWidth)
    const videoViewAspect = (videoViewHeight / videoViewWidth)

    const [frameViewWidth, frameViewHeight] = (videoViewAspect > frameAspect)
      ? [videoViewWidth, videoViewWidth * frameAspect]
      : [videoViewHeight / frameAspect, videoViewHeight]

    const videoRatio = (videoAspect > videoViewAspect)
      ? (videoWidth / videoViewWidth)
      : (videoHeight / videoViewHeight)

    const w = frameViewWidth * videoRatio
    const h = frameViewHeight * videoRatio
    const x = (videoWidth - w) / 2
    const y = (videoHeight - h) / 2

    const context = canvas.current.getContext('2d')
    if (shouldFacingUser) {
      context.translate(FRAME_WIDTH, 0)
      context.scale(-1, 1)
    }
    context.drawImage(video.current, x, y, w, h, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)

    canvas.current.toBlob(blob => {
      console.log(`takePhoto blob`, blob)
      video.current.play()
    })
  }, [shouldFacingUser])

  const switchFacing = useCallback(() => {
    video.current.srcObject?.getTracks()?.forEach(track => track.stop())
    setShouldFacingUser(!shouldFacingUser)
  }, [shouldFacingUser])

  useEffect(() => {
    const touchmove = e => e.preventDefault()
    const scrollEvents = ['mousewheel', 'touchmove']
    scrollEvents.forEach(e => document.addEventListener(e, touchmove, { passive: false }))
    return () => {
      scrollEvents.forEach(e => document.removeEventListener(e, touchmove))
    }
  }, [])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => console.log(`*** devices`, devices))
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: shouldFacingUser ? 'user' : 'environment'
      },
      audio: false
    })
      .then(stream => {
        video.current.srcObject = stream
      })
      .catch(err => {
        console.error(err)
      })
  }, [shouldFacingUser])

  return (
    <div>
      <video
        ref={ref => video.current = ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          transform: shouldFacingUser && 'scaleX(-1)'
        }}
        autoPlay
        playsInline
        muted
        // width={IMAGE_WIDTH}
        // height={IMAGE_HEIGHT}
        // onLoadedMetadata={() => {
        //   console.log(`*** height=${video.current.videoHeight} width=${video.current.videoWidth}`)
        // }}
      />
      <canvas
        ref={ref => canvas.current = ref}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'contain'
        }}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
      />
      <img
        src={frameImage}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'contain'
        }}
        alt="Frame image"
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{
          height: 80,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: 20
        }}>
          <button onClick={switchFacing}>
            SWITCH FACING
          </button>
        </div>
        <div style={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          padding: 20
        }}>
          <div style={{ flex: 1 }}>
          </div>
          <div>
            <button onClick={takePhoto}>
              SHOOT
            </button>
          </div>
          <div style={{ flex: 1 }}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
