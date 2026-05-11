<template>
  <div id="yudu-app">
    <!-- 粒子背景 -->
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>

    <!-- 导航 -->
    <nav class="nav" :class="{ scrolled: scrolled }">
      <div class="nav-logo">渔渡</div>
      <div class="nav-links">
        <a href="#architecture" class="nav-link-item">架构</a>
        <a href="#products" class="nav-link-item">产品</a>
        <a href="#features" class="nav-link-item">特性</a>
        <a href="#download" class="nav-link-item">下载</a>
        <button class="nav-btn magnetic-btn" @click="scrollTo('#download')" @mousemove="magnetize($event)" @mouseleave="resetMagnet($event)">立即体验</button>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero" id="hero">
      <div class="hero-badge"><span class="dot"></span> 渔渡生态全新发布</div>
      <h1 class="hero-title">
        <span class="hero-line" v-for="(line, i) in heroLines" :key="i" :style="{ animationDelay: i * 0.3 + 's' }">
          <span v-if="line.gradient" class="gradient shimmer-text">{{ line.text }}</span>
          <span v-else>{{ line.text }}</span>
        </span>
      </h1>
      <p class="hero-sub typewriter" ref="heroSub"></p>
      <div class="hero-actions">
        <button class="btn-primary magnetic-btn" @click="scrollTo('#products')" @mousemove="magnetize($event)" @mouseleave="resetMagnet($event)">了解产品 →</button>
        <button class="btn-outline magnetic-btn" @click="scrollTo('#download')" @mousemove="magnetize($event)" @mouseleave="resetMagnet($event)">⬇ 下载体验</button>
      </div>
      <!-- 滚动指示 -->
      <div class="scroll-indicator" @click="scrollTo('#architecture')">
        <div class="scroll-mouse">
          <div class="scroll-wheel"></div>
        </div>
        <span>向下滚动</span>
      </div>
    </section>

    <!-- 产品架构图 -->
    <section class="architecture" id="architecture">
      <div class="reveal" ref="archReveal">
        <div style="text-align:center">
          <span class="section-label green">产品架构</span>
          <h2 class="section-title">一生态，多产品，全链路</h2>
          <p class="section-desc" style="margin:0 auto">渔渡生态以「交付中枢」为核心，连接控制端、学习、文件管理，形成完整闭环。</p>
        </div>
        <div class="arch-diagram">
          <div class="arch-hub">
            <div class="arch-hub-icon">🏠</div>
            <div class="arch-hub-text">渔渡交付中枢</div>
            <div class="arch-hub-sub">桌面端 · 核心枢纽</div>
          </div>
          <div class="arch-connector"></div>
          <div class="arch-nodes">
            <div class="arch-node" v-for="n in archNodes" :key="n.name"
              @mouseenter="hoverNode = n.name" @mouseleave="hoverNode = ''"
              :style="{ transform: hoverNode === n.name ? 'translateY(-6px)' : '', boxShadow: hoverNode === n.name ? 'var(--shadow-glow)' : '' }">
              <div class="arch-node-icon">{{ n.icon }}</div>
              <div class="arch-node-name">{{ n.name }}</div>
              <div class="arch-node-desc">{{ n.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品介绍 -->
    <section class="products" id="products">
      <div class="reveal" ref="productsReveal">
        <div style="text-align:center">
          <span class="section-label blue">产品矩阵</span>
          <h2 class="section-title">四大核心产品</h2>
          <p class="section-desc" style="margin:0 auto">覆盖交付管理、移动控制、学习规划、文件整理全场景。</p>
        </div>
        <div class="products-grid">
          <div class="product-card tilt-card" v-for="p in products" :key="p.name"
            @mousemove="tiltCard($event)" @mouseleave="resetTilt($event)">
            <div class="product-glow" :class="p.colorClass"></div>
            <div class="product-icon" :class="p.colorClass">{{ p.icon }}</div>
            <h3 class="product-name">{{ p.name }}</h3>
            <p class="product-desc">{{ p.desc }}</p>
            <div class="product-tags">
              <span class="product-tag" v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>
            <div class="product-actions">
              <button class="product-download" :class="p.colorClass">{{ p.downloadLabel }}</button>
              <a class="product-link" :href="p.link">了解更多 →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性 -->
    <section class="features" id="features">
      <div class="reveal" ref="featuresReveal">
        <div style="text-align:center">
          <span class="section-label orange">核心特性</span>
          <h2 class="section-title">为什么选择渔渡</h2>
          <p class="section-desc" style="margin:0 auto">统一的数据中枢、实时的协作体验、科学的复习算法。</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="f in features" :key="f.title">
            <div class="feature-icon">{{ f.icon }}</div>
            <h4 class="feature-title">{{ f.title }}</h4>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 下载 -->
    <section class="download" id="download">
      <div class="reveal" ref="downloadReveal">
        <div style="text-align:center">
          <span class="section-label green">下载安装</span>
          <h2 class="section-title">立即开始使用</h2>
          <p class="section-desc" style="margin:0 auto">所有产品均可免费下载，开箱即用。</p>
        </div>
        <div class="download-box">
          <h3>选择您的产品</h3>
          <p>支持 macOS、Windows、iOS 多平台</p>
          <div class="download-items">
            <div class="download-item" v-for="d in downloads" :key="d.name">
              <div class="download-item-left">
                <span class="download-item-icon">{{ d.icon }}</span>
                <div>
                  <div class="download-item-name">{{ d.name }}</div>
                  <div class="download-item-platform">{{ d.platform }}</div>
                </div>
              </div>
              <button class="download-item-btn">下载</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">渔渡</div>
          <p class="footer-desc">交付与学习的智能中枢，让团队和个人更高效地完成目标。</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <div class="footer-col-title">产品</div>
            <a href="#products">交付中枢</a>
            <a href="#products">控制端</a>
            <a href="#products">渔渡学习</a>
            <a href="#products">文件管理</a>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">支持</div>
            <a href="#">文档</a>
            <a href="#">常见问题</a>
            <a href="#">联系我们</a>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">关于</div>
            <a href="#">关于渔渡</a>
            <a href="#">更新日志</a>
            <a href="#">开源协议</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 渔渡. All rights reserved.</span>
        <span>以匠心打造，以渔渡远航</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const scrolled = ref(false)
const hoverNode = ref('')
const particleCanvas = ref(null)
const heroSub = ref(null)
const archReveal = ref(null)
const productsReveal = ref(null)
const featuresReveal = ref(null)
const downloadReveal = ref(null)

const heroLines = [
  { text: '交付与学习的', gradient: false },
  { text: '智能中枢', gradient: true },
]

const heroSubText = '渔渡打造交付管理、学习规划、文件整理的全链路产品矩阵，让团队协作更高效、个人成长更科学。'

const archNodes = [
  { icon: '📱', name: '中枢控制端', desc: 'iOS 移动遥控' },
  { icon: '📚', name: '渔渡学习', desc: '遗忘曲线复习' },
  { icon: '📁', name: '文件管理', desc: '本地文件整理' },
  { icon: '🤖', name: 'LLM 代理', desc: 'AI 能力接入' },
]

const products = [
  {
    icon: '🏠',
    name: '渔渡交付中枢',
    desc: '桌面端项目与条目管理工具，支持多人远程控制、语雀数据同步、AI 作业导入、附件配图管理。统一管理所有项目的需求、Bug 和开发进度。',
    tags: ['Electron', 'WebSocket', '语雀同步', 'AI导入'],
    colorClass: 'teal',
    downloadLabel: '下载桌面端',
    link: '#',
  },
  {
    icon: '📱',
    name: '渔渡交付中枢控制端',
    desc: 'iOS 移动端远程控制桌面交付中枢。在手机上查看项目、新建/编辑条目、上传配图，随时随地掌控项目进度。',
    tags: ['Flutter', 'iOS', '远程控制', '配图上传'],
    colorClass: 'orange',
    downloadLabel: 'App Store',
    link: '#',
  },
  {
    icon: '📚',
    name: '渔渡学习',
    desc: '基于艾宾浩斯遗忘曲线的学习计划管理器，支持多科目、自定义复习间隔、月历视图、AI 作业导入和拼音认读练习工具。',
    tags: ['Electron', '遗忘曲线', 'AI导入', '拼音认读'],
    colorClass: 'purple',
    downloadLabel: '下载桌面端',
    link: '#',
  },
  {
    icon: '📁',
    name: '渔渡文件管理',
    desc: '本地文件浏览器与整理工具，支持 Finder 收藏夹集成、文件快速预览与分类管理，让文件井井有条。',
    tags: ['Electron', '本地文件', 'Finder集成'],
    colorClass: 'blue',
    downloadLabel: '下载桌面端',
    link: '#',
  },
]

const features = [
  { icon: '🔗', title: '数据中枢', desc: '所有项目数据统一管理，一处修改处处同步，告别信息孤岛。' },
  { icon: '📡', title: '远程协作', desc: '手机控制端通过 WebSocket 实时连接桌面端，随时掌握进度。' },
  { icon: '🧠', title: 'AI 加持', desc: '集成 LLM 能力，支持 AI 作业导入、语雀笔记同步等智能功能。' },
  { icon: '📈', title: '科学复习', desc: '艾宾浩斯遗忘曲线算法，自动规划最佳复习时间节点。' },
  { icon: '🎨', title: '多端适配', desc: '桌面端 macOS/Windows + iOS 控制端，全平台无缝衔接。' },
  { icon: '🔒', title: '数据自主', desc: '数据存储在本地，不依赖云服务，完全掌控自己的信息。' },
]

const downloads = [
  { icon: '🏠', name: '渔渡交付中枢', platform: 'macOS / Windows' },
  { icon: '📱', name: '交付中枢控制端', platform: 'iOS (App Store)' },
  { icon: '📚', name: '渔渡学习', platform: 'macOS / Windows' },
  { icon: '📁', name: '渔渡文件管理', platform: 'macOS' },
]

function scrollTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
}

// 打字机效果
function typeWriter(el, text, speed = 35) {
  let i = 0
  el.textContent = ''
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// 磁吸按钮
function magnetize(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
}
function resetMagnet(e) {
  e.currentTarget.style.transform = ''
}

// 3D 倾斜卡片
function tiltCard(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`
}
function resetTilt(e) {
  e.currentTarget.style.transform = ''
}

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

// 粒子背景
let animId = null
function initParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w = canvas.width = window.innerWidth
  let h = canvas.height = window.innerHeight
  const count = 60
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
  }))
  function draw() {
    ctx.clearRect(0, 0, w, h)
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0,201,167,0.4)'
      ctx.fill()
    }
    // 连线
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0,201,167,${0.15 * (1 - dist / 150)})`
          ctx.stroke()
        }
      }
    }
    animId = requestAnimationFrame(draw)
  }
  draw()
  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  })
}

// 滚动显现
let observer = null
function initReveal() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
    })
  }, { threshold: 0.15 })
  ;[archReveal, productsReveal, featuresReveal, downloadReveal].forEach(r => {
    if (r.value) observer.observe(r.value)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initParticles()
  initReveal()
  // 打字机效果
  nextTick(() => {
    if (heroSub.value) typeWriter(heroSub.value, heroSubText, 30)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (animId) cancelAnimationFrame(animId)
  if (observer) observer.disconnect()
})
</script>
