---
title: Singletons in Unity
date: 2023-08-24
tags:
  - c#
  - unity
  - patterns
---

This is an easy way to make a singleton object in Unity. I won't go into the pros and cons of Singletons, but I have found it a good pattern to use in game programming when you want to easily access objects that should only really exist as a single instance and where you often need access from many other objects, such as manager objects or the single player object.

```csharp
public class Singleton : MonoBehaviour
{
    public static Singleton Instance {get; private set };

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(this);
            return;
        }

        Instance = this;

        // keep singleton alive between scenes
        DontDestroyOnLoad(gameObject);
    }
}
```
