{
  "parser": "babel-eslint",
  "extends": "eslint-config-airbnb",
  "rules": {
    // indentation
    // 缩进改为 4 个空格
    "indent": [ 2, 2 ],
    // 不对注释前的空格做强制要求
    "spaced-comment": [0, "always"],
    // 允许使用匿名函数
    "func-names": [0],
    // 不对数组或对象末尾逗号做强制要求
    "comma-dangle": [1, "never"],
    "block-spacing": [2, "always"],
    "linebreak-style": ["error", "unix"],
    // 禁止函数参数的直接操作
    "no-param-reassign": [0],
    // 处理 import 时的报错，webpack 兼容问题
    "import/extensions": [0],
    "import/no-unresolved": [0],
    "import/no-extraneous-dependencies": [0],
    // react
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-space-before-closing": [2, "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // 使用 pureRender 时，会出现错误的 class 提示信息
    "react/prefer-stateless-function": [0]
  },
  "globals": {
    "window": true,
    "swal": true,
    "$": true,
    "saveAs": true,
    "localStorage": true,
    "fetch" :true,
    "Logger" : true,
    "RSVP": true
  },
  "ecmaFeatures": {
    "experimentalObjectRestSpread": true
  }
}
