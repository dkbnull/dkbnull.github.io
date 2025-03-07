/*
 * Copyright (c) 2017-2025 null. All rights reserved.
 */

/**
 * script.js
 *
 * @author null
 * @date 2025-03-08
 * @link <a href="https://github.com/dkbnull/dkbnull.github.io">GitHub</a>
 */
document.addEventListener('DOMContentLoaded', function () {
    // 加载页头
    fetch('/templates/header.html')
        .then(response => response.text())
        .then(html => {
            const headerPlaceholder = document.createElement('div');
            headerPlaceholder.innerHTML = html;
            document.body.prepend(headerPlaceholder);

            // 高亮当前页面菜单
            const currentPath = window.location.pathname;
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 加载页脚
    fetch('/templates/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerPlaceholder = document.createElement('div');
            footerPlaceholder.innerHTML = html;
            document.body.append(footerPlaceholder);
        });
});

// 动态生成面包屑导航
function generateBreadcrumb() {
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    if (!breadcrumbContainer) return;

    // 获取当前页面路径
    const path = window.location.pathname;

    // 拆分路径为片段（过滤空值）
    const segments = path.split('/').filter(p => p && p !== 'index.html');

    // 生成面包屑 HTML
    let breadcrumbHtml = '<a href="/">首页</a>';
    let accumulatedPath = '';

    segments.forEach((segment, index) => {
        const isLast = index === segments.length - 1;
        accumulatedPath += `/${segment}`;

        // 处理文件名（如 "article.html" → "article"）
        const name = segment.replace(/.html$/, '');

        // 自定义友好名称（可选）
        const friendlyNames = {
            posts: '文章',
            about: '关于',
            archive: '归档'
        };

        const displayName = friendlyNames[name] || name;

        breadcrumbHtml += `
            <span class="separator">/</span>
            ${isLast ?
            `<span class="current">${displayName}</span>` :
            `<a href="${accumulatedPath}">${displayName}</a>`
        }
        `;
    });

    // 插入面包屑导航
    breadcrumbContainer.innerHTML = `<div class="breadcrumb">${breadcrumbHtml}</div>`;
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', generateBreadcrumb);