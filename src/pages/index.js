import React, { useEffect, useRef, useState } from "react"

import './styles.scss'
import testImage from '../images/test.png'
import frameImage from '../images/img10-f.png'

const FRAME_HEIGHT = 640
const FRAME_WIDTH = 480
const frameAspect = FRAME_HEIGHT / FRAME_WIDTH

const IndexPage = () => {
  const video = useRef()
  const canvas = useRef()

  const [downloadURL, setDownloadURL] = useState()

  const takePhoto = () => {
    video.current.pause()

    const context = canvas.current.getContext('2d')

    const videoStyle = window.getComputedStyle(video.current)
    const videoViewWidth = parseFloat(videoStyle.width)
    const videoViewHeight = parseFloat(videoStyle.height)
    console.log(`*** videoView width=${videoViewWidth} height=${videoViewHeight}`)
    // const canvasStyle = window.getComputedStyle(canvas.current)
    // console.log(`*** canvas width=${canvasStyle.width} height=${canvasStyle.height}`)
    // const frameStyle = window.getComputedStyle(frame.current)
    // console.log(`*** frame width=${frameStyle.width} height=${frameStyle.height}`)

    const { videoWidth, videoHeight } = video.current
    console.log(`*** video width=${videoWidth} height=${videoHeight}`)

    const videoAspect = (videoHeight / videoWidth)
    const videoViewAspect = (videoViewHeight / videoViewWidth)

    const [frameViewWidth, frameViewHeight] = (videoViewAspect > frameAspect)
      ? [videoViewWidth, videoViewWidth * frameAspect]
      : [videoViewHeight / frameAspect, videoViewHeight]
    console.log(`*** frameView width=${frameViewWidth} height=${frameViewHeight}`)

    const videoRatio = (videoAspect > videoViewAspect)
      ? (videoWidth / videoViewWidth)
      : (videoHeight / videoViewHeight)
    console.log(`*** videoRatio=${videoRatio}`)

    const w = frameViewWidth * videoRatio
    const h = frameViewHeight * videoRatio
    const x = (videoWidth - w) / 2
    const y = (videoHeight - h) / 2

    console.log(`*** drawImage x=${x} y=${y} w=${w} h=${h}`)
    context.drawImage(video.current, x, y, w, h, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)

    canvas.current.toBlob(blob => {
      console.log(`*** blob`, blob)
      const url = URL.createObjectURL(blob)
      setDownloadURL(url)
    })
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
      .then(stream => {
        video.current.srcObject = stream

        setTimeout(takePhoto, 3000)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

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
          objectFit: 'cover'
        }}
        autoPlay
        playsInline
        muted
        poster={testImage}
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
          height: 100
        }}></div>
        <div style={{
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {downloadURL &&
            <a href={downloadURL} download >
              DOWNLOAD
            </a>
          }
        </div>
      </div>
    </div>
  )
}

export default IndexPage
