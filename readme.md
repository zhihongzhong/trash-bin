# trash-bin
a trash-bin game 

# 超轻量级移动端CANVAS开发框架
# v0.0.01版

## 开发方法：

#### 1.本框架采用类似原生js的事件机制，处理canvas中的事件，每个组件默认会接收touchStart, touchMove, touchEnd 事件， 当组件需要停止上层组件接受事件时，使用
stopProgatation 即可取消事件传播。

#### 2.组件的大小采用 100(宽) *100(高) 表示， 例如在实例化组件时将组件声明为 100* 100， 则该组件将覆盖整个屏幕大小。 

#### 3.组件注入前和注入后的事件：
    组件在注入容器时会发生beforeAddToContainer 和 afterAddToContainer 事件，在这个事件周期可以处理一些像素计算问题.


由于开发周期紧急，没有将demo和游戏实例分开，后续将抽离核心游戏对象.
