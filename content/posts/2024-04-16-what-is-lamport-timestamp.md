---
title: Lamport Timestamp는 무엇인가?
date: 2024-04-16
draft: false
tags: [DevKor, Distributed System]
---

Lamport Timestamp는 분산되어 있는 시스템에서 이벤트의 순서를 결정하기 위해서 사용되는 알고리즘입니다.

# 알고리즘

1. 각 프로세스는 본인이 이벤트를 발생시키기 이전에 본인의 카운터를 1 증가시킵니다.
2. 프로세스는 다른 프로세스에 요청할 때 1에서 증가시킨 카운터의 값을 포함시킵니다.
3. 요청을 수신한 프로세스는 본인의 카운터와 받은 요청의 카운터 중 큰 값을 택하여 본인의 카운터 값으로 사용합니다.
4. 요청을 수신한 프로세스는 수신 완료처리하기 이전에 본인의 카운터를 1 증가시킵니다.

# Lamport Timestamp가 보장하는 것

$C(x)$가 $x$의 카운터 값이라고 할 때,

- $a \rightarrow b$이면 $C(a) < C(b)$ 입니다.
    - $C(a) < C(b)$가 $a \rightarrow b$임을 보장해주진 않습니다. - Partial Order
    - Vector Clock 같은 다른 기술을 이용하면 가능합니다.
- Total Order를 지원하기 위해 Process ID 같은 것을 사용하여 강제로 순서를 부여할 수 있습니다.
    - 하지만 이는 완전히 인위적으로 부여한 것이며 실제 순서와는 상관없을 수 있습니다.

# 참고한 자료

- https://en.wikipedia.org/wiki/Lamport_timestamp
