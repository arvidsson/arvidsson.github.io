---
title: Shuffle list extension
date: 2023-08-23
tags:
  - c#
---

Shuffle list.

```csharp
using System.Collections.Generic;

public static class ListExtensions
{
    public static void Shuffle<T>(this IList<T> list)
    {
        var n = list.Count;
        var rng = new System.Random();

        while (n > 1)
        {
            n--;
            var k = rng.Next(n + 1);
            T value = list[k];
            list[k] = list[n];
            list[n] = value;
        }
    }
}
```
