import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'
import './main.css'

window.onload = () => {
    // 创建场景
    const scene = new THREE.Scene()
    // 创建立方体
    const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xffffff }))
    scene.add(cube)
    // 创建摄像机
    const camera = new THREE.PerspectiveCamera(90, innerWidth / innerHeight)
    camera.lookAt(0,0,0)
    camera.position.set(0, 0, 5)
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector<HTMLCanvasElement>('#app-canvas')!,
      antialias: true
    })
    renderer.setPixelRatio(10)
    // 创建调试面板
    const debug = new dat.GUI()
    const cameraDebug = debug.addFolder('camera')
    cameraDebug.add(camera.position, 'x').name('positionX').step(0.01)
    cameraDebug.add(camera.position, 'y').name('positionY').step(0.01)
    cameraDebug.add(camera.position, 'z').name('positionZ').step(0.01)
    cameraDebug.open()
    let rotateSpeed = new THREE.Vector3(0.01, 0.01)
    const cubeDebug = debug.addFolder('cube')
    cubeDebug.add(rotateSpeed, 'x').name('rotate speed x').step(0.001)
    cubeDebug.add(rotateSpeed, 'y').name('rotate speed y').step(0.001)
    cubeDebug.add(rotateSpeed, 'z').name('rotate speed z').step(0.001)
    cubeDebug.add(cube.material.color, 'r').max(1).min(0).step(0.01)
    cubeDebug.add(cube.material.color, 'g').max(1).min(0).step(0.01)
    cubeDebug.add(cube.material.color, 'b').max(1).min(0).step(0.01)
    cubeDebug.open()
    // 创建 three 状态查看器
    const stats = Stats()
    document.body.appendChild(stats.dom)
    // 窗口大小变化监听
    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    })
    // 帧刷
    const render = () => {
      requestAnimationFrame(render)
      renderer.render(scene, camera)
      cube.rotateX(rotateSpeed.x)
      cube.rotateY(rotateSpeed.y)
      cube.rotateZ(rotateSpeed.z)
      stats.update()
    }
    render()
}