---
title: Shuffle list
date: 2023-08-23
tags:
  - c#
---

An extension to List to shuffle it with a method based on the [Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) shuffle algorithm.

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
