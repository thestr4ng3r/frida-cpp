
# frida-cpp

Inspect C++ code and STL objects with Frida

## Features

Introspection for the following STL classes of MSVC:
* `std::string` (`StdString`)
* `std::vector` (`StdVector`)
* `std::deque` (`StdDeque`)

## Example

```
import { StdString } from "frida-cpp";
console.log(new StdString(ptr(0x1337)));
```